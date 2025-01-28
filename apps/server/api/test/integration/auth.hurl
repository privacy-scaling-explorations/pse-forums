POST http://localhost:3000/rspc/auth.signin
{
  "password": "11111111",
  "username": "user1"
}
HTTP 200
[Asserts]
jsonpath "$.result.data.user.encrypted_password" exists
jsonpath "$.result.data.user.salt" exists
jsonpath "$.result.data.user.username" == "user1"
jsonpath "$.result.data.user.email" == "user1@example.com"
jsonpath "$.result.data.token" exists
