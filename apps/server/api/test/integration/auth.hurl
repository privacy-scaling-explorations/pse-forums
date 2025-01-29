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

####### validations
### email
POST http://localhost:3000/rspc/auth.signup
{ "email": "foobar.com", "password": "11111111", "username": "foobar" }
HTTP 200
[Asserts]
jsonpath "$.result.data.message" == "Invalid email format"
jsonpath "$.result.type" == "error"
jsonpath "$.result.data.code" == 400

# password
POST http://localhost:3000/rspc/auth.signup
{ "email": "foo@bar.com", "password": "111", "username": "foo" }
HTTP 200
[Asserts]
jsonpath "$.result.data.message" contains "Invalid password: Too short"
jsonpath "$.result.type" == "error"
jsonpath "$.result.data.code" == 400

POST http://localhost:3000/rspc/auth.signup
{ "email": "foo@bar.com", "password": "11111111111111111111111111111111111111111111111111", "username": "foo" }
HTTP 200
[Asserts]
jsonpath "$.result.data.message" contains "Invalid password: Too long"
jsonpath "$.result.type" == "error"
jsonpath "$.result.data.code" == 400

POST http://localhost:3000/rspc/auth.signup
{ "email": "foo@bar.com", "password": "11111111111", "username": "foo" }
HTTP 200
[Asserts]
jsonpath "$.result.data.message" contains "Invalid password: Too simple"
jsonpath "$.result.type" == "error"
jsonpath "$.result.data.code" == 400

# username
POST http://localhost:3000/rspc/auth.signup
{ "email": "foo@bar.com", "password": "1872346djklsjai&*$", "username": "f-o" }
HTTP 200
[Asserts]
jsonpath "$.result.data.message" contains "Invalid username"
jsonpath "$.result.type" == "error"
jsonpath "$.result.data.code" == 400

POST http://localhost:3000/rspc/auth.signup
{ "email": "foo@bar.com", "password": "1872346djklsjai&*$", "username": "" }
HTTP 200
[Asserts]
jsonpath "$.result.data.message" contains "Invalid username"
jsonpath "$.result.type" == "error"
jsonpath "$.result.data.code" == 400


POST http://localhost:3000/rspc/auth.signup
{ "email": "foo@bar.com", "password": "1872346djklsjai&*$", "username": "aaaaaaaaaaaaaaaaaaaaaa" }
HTTP 200
[Asserts]
jsonpath "$.result.data.message" contains "Invalid username"
jsonpath "$.result.type" == "error"
jsonpath "$.result.data.code" == 400
