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
