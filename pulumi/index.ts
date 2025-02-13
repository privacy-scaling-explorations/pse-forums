const tsConfig = require("./tsconfig.json")
const tsConfigPaths = require("tsconfig-paths")
tsConfigPaths.register({
  baseUrl: "./",
  paths: tsConfig.compilerOptions.paths,
})

import { lightsail } from "@pulumi/aws"
import { interpolate } from "@pulumi/pulumi"
import * as resources from "r" // need to import all resources for them to be created
import { sshPrivateKeyPath } from "r/config"

const { dnsRecord, lightsailInstance, sshKey, hostedZone } = resources

export const domain = dnsRecord.fqdn
export const hostedZoneId = dnsRecord.zoneId
export const sshCommand = interpolate`ssh -i ${sshPrivateKeyPath} ubuntu@${lightsailInstance.publicIpAddress}`
export const lightsailInstanceId = lightsailInstance.id
export const publiccIp = lightsailInstance.publicIpAddress
