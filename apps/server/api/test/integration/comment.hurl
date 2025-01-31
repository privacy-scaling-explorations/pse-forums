GET http://localhost:3000/rspc/comment.read?input=1
HTTP 200
[Asserts]
jsonpath "$.result.data.content" == "Comment by user 1 on post 1"
jsonpath "$.result.data.id" == 1
jsonpath "$.result.data.pid" == 1
jsonpath "$.result.data.uid" == 1

POST http://localhost:3000/rspc/comment.create
{
  "content": "some content",
  "pid": 1
}
HTTP 200
[Asserts]
jsonpath "$.result.data.code" == 401
jsonpath "$.result.data.message" == "No Bearer token provided"


GET http://localhost:3000/rspc/comment.list?input=1
HTTP 200
[Asserts]
jsonpath "$.result.data" isCollection
jsonpath "$.result.data" count >= 1
jsonpath "$.result.data[0].content" == "Comment by user 1 on post 1"
jsonpath "$.result.data[0].created_at" exists
jsonpath "$.result.data[0].pid" == 1
jsonpath "$.result.data[0].id" == 1
# why is this present and null if null (shouldn't serde skip null fields)?
jsonpath "$.result.data[0].uid" == 1
jsonpath "$.result.data[0].rid" == null
