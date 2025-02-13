#!/bin/bash
set -ex

APP_DIR="/home/ubuntu"
LOG_FILE="/var/log/user-data.log"

echo "Starting user-data script" | tee -a "$LOG_FILE"

export DOMAIN="${DOMAIN:-aforum.click}"
echo "Using domain: $DOMAIN" | tee -a "$LOG_FILE"

# https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository
install_docker() {
  sudo apt install -y ca-certificates curl
  sudo install -m 0755 -d /etc/apt/keyrings
  sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
  sudo chmod a+r /etc/apt/keyrings/docker.asc

  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" |
    sudo tee /etc/apt/sources.list.d/docker.list >/dev/null
  sudo apt update -y
  sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
}

install_caddy() {
  sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
  sudo apt update -y
  sudo apt install -y caddy
}

install_deps() {
  echo "Installing dependencies..." | tee -a "$LOG_FILE"

  sudo apt update -y
  sudo apt upgrade -y
  sudo apt install -y git

  install_docker
  install_caddy
}

# FIXME
setup_docker() {
  echo "Configuring Docker..." | tee -a "$LOG_FILE"
  sudo usermod -aG docker ubuntu
  newgrp docker
  echo "Logging into GHCR..." | tee -a "$LOG_FILE"
  echo "{{GITHUB_TOKEN}}" | docker login ghcr.io -u "ubuntu" --password-stdin

  sudo systemctl enable docker
  sudo systemctl start docker
}

setup_repo() {
  echo "Setting up repo..." | tee -a "$LOG_FILE"
  REPO_URL="https://github.com/privacy-scaling-explorations/pse-forums.git"

  if [ ! -d "$APP_DIR/pse-forums" ]; then
    git clone --depth 1 --branch main "$REPO_URL" "$APP_DIR/pse-forums"
  else
    cd "$APP_DIR/pse-forums"
    git fetch --depth 1 origin main
    git reset --hard origin/main
  fi
}

setup_caddy() {
  echo "Setting up Caddy..." | tee -a "$LOG_FILE"
  sudo mkdir -p /etc/caddy

  cat <<EOF | sudo tee /etc/caddy/Caddyfile
  ${DOMAIN} {
      reverse_proxy * http://localhost
      tls {
          ca https://acme-v02.api.letsencrypt.org/directory
      }
  }
EOF

  sudo systemctl enable caddy
  sudo systemctl restart caddy
}

run() {
  echo "Running Docker Compose..." | tee -a "$LOG_FILE"
  cd "$APP_DIR/pse-forums"
  docker compose up -d
}

main() {
  install_deps
  setup_docker
  setup_repo
  run
  setup_caddy
}

main
