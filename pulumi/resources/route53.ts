import { acm, route53 } from "@pulumi/aws"
import { domain } from "r/config"
import { lightsailInstance } from "r/lightsail"

export const hostedZone = route53.getZone({ name: domain })

export const dnsRecord = new route53.Record("forum-dns", {
  name: domain,
  records: [lightsailInstance.publicIpAddress],
  ttl: 300,
  type: "A",
  zoneId: hostedZone.then((zone) => zone.zoneId),
})
