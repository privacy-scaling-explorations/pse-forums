GET http://localhost:3000/rspc/group.read?input=1
HTTP 200
[Asserts]
jsonpath "$.result.data.description" == "This is group 1"
jsonpath "$.result.data.id" == 1
jsonpath "$.result.data.name" == "group1"
jsonpath "$.result.data.tags" count == 2
jsonpath "$.result.data.tags[1]" == "tag2"

GET http://localhost:3000/rspc/group.list
HTTP 200
[Asserts]
jsonpath "$.result.data" isCollection
jsonpath "$.result.data" count >= 2
jsonpath "$.result.data[0].description" == "This is group 1"
jsonpath "$.result.data[0].id" == 1
jsonpath "$.result.data[0].name" == "group1"
jsonpath "$.result.data[0].tags" count == 2
jsonpath "$.result.data[0].tags[0]" == "tag1"
jsonpath "$.result.data[0].tags[1]" == "tag2"
jsonpath "$.result.data[1].id" == 2
jsonpath "$.result.data[1].name" == "group2"
jsonpath "$.result.data[1].tags" count == 1
jsonpath "$.result.data[1].tags[0]" == "tag3"

POST http://localhost:3000/rspc/group.create
{
  "name": "some group",
  "description": "some description"
}
HTTP 200
[Asserts]
jsonpath "$.result.data.code" == 401
jsonpath "$.result.data.message" == "No Bearer token provided"
