import { Config } from "@pulumi/pulumi"
import { readFileSync } from "node:fs"

const config = new Config()

const sshPubKeyPath = config.require("sshPubKeyPath")
const sshPublicKey = readFileSync(sshPubKeyPath, "utf8").trim()
export const sshPrivateKeyPath = sshPubKeyPath.replace(".pub", "")

export const sshKey = {
  name: "lightsail-forum-key",
  publicKey: sshPublicKey,
}

export const awsRegion = config.get("awsRegion") || "eu-north-1"

export const domain = config.require("domain")

export const githubToken = config.requireSecret("githubToken")
