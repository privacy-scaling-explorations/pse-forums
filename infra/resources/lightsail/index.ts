import { lightsail } from "@pulumi/aws"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { awsRegion, githubToken } from "r/config"
import { keyPair } from "r/ssh-key"

const userDataTemplate = readFileSync(join(__dirname, "user-data.sh"), "utf8")
const userData = githubToken.apply((token) => userDataTemplate.replace("{{GITHUB_TOKEN}}", token))

export const lightsailInstance = new lightsail.Instance("forum", {
  availabilityZone: `${awsRegion}a`,
  blueprintId: "ubuntu_22_04",
  bundleId: "micro_3_0",
  keyPairName: keyPair.name.apply((name) => name),
  userData,
})

// Allow SSH access
export const firewallRules = new lightsail.InstancePublicPorts(
  "firewall-rules",
  {
    instanceName: lightsailInstance.name,
    portInfos: [
      { fromPort: 22, toPort: 22, protocol: "tcp" },
      { fromPort: 80, toPort: 80, protocol: "tcp" },
      { fromPort: 443, toPort: 443, protocol: "tcp" },
    ],
  },
)
