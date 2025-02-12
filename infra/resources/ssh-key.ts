import { lightsail } from "@pulumi/aws"
import { sshKey } from "r/config"

export const keyPair = new lightsail.KeyPair(sshKey.name, sshKey)
