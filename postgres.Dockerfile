FROM postgres:16

# Install build dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    git \
    postgresql-server-dev-16 \
    build-essential \
    make \
    gcc \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Clone and build the pgjwt extension
RUN git clone https://github.com/michelp/pgjwt.git /tmp/pgjwt && \
    cd /tmp/pgjwt && \
    make && \
    make install && \
    cd / && \
    rm -rf /tmp/pgjwt

# Cleanup
RUN apt-get remove -y git postgresql-server-dev-16 build-essential make gcc && \
    apt-get autoremove -y && \
    apt-get clean 