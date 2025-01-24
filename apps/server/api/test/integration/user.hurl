GET http://localhost:3000/rspc/user.read?input=%22user1%22
HTTP 200
[Asserts]
jsonpath "$.result.data.id" == 1
jsonpath "$.result.data.email" == "user1@example.com"
jsonpath "$.result.data.username" == "user1"
jsonpath "$.result.data.encrypted_password" isString # not checking value as salting is random and will be diferent on each seeding
jsonpath "$.result.data.salt" isString
