GET http://localhost:3000/rspc/profile.list
HTTP 200
[Asserts]
jsonpath "$.result.data" count == 2
jsonpath "$.result.data[0].id" == 1
jsonpath "$.result.data[0].about" == "User1's profile"
jsonpath "$.result.data[0].username" == "user1"
jsonpath "$.result.data[0].url" == "https://user1profile.example.com"

GET http://localhost:3000/rspc/profile.read?input=%22user1%22
HTTP 200
[Asserts]
jsonpath "$.result.data.id" == 1
jsonpath "$.result.data.about" == "User1's profile"
jsonpath "$.result.data.username" == "user1"
jsonpath "$.result.data.url" == "https://user1profile.example.com"
