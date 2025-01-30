GET http://localhost:3000/rspc/post.read?input=1
HTTP 200
[Asserts]
jsonpath "$.result.data.content" == "This is the content of post 1"
jsonpath "$.result.data.id" == 1
jsonpath "$.result.data.gid" == 1
jsonpath "$.result.data.title" == "Post Title 1"
jsonpath "$.result.data.uid" == 1

POST http://localhost:3000/rspc/post.create
{
  "content": "some content",
  "title": "some title"
}
HTTP 200
[Asserts]
jsonpath "$.result.data.code" == 401
jsonpath "$.result.data.message" == "No Bearer token provided"

GET http://localhost:3000/rspc/post.list?input=1
HTTP 200
[Asserts]
jsonpath "$.result.data" isCollection
jsonpath "$.result.data" count >= 1
jsonpath "$.result.data[0].content" == "This is the content of post 1"
jsonpath "$.result.data[0].created_at" exists
jsonpath "$.result.data[0].gid" == 1
jsonpath "$.result.data[0].id" == 1
jsonpath "$.result.data[0].tags" isCollection
jsonpath "$.result.data[0].tags" count == 2
jsonpath "$.result.data[0].title" == "Post Title 1"
jsonpath "$.result.data[0].uid" == 1
