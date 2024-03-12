const http = require("http");
let movies = require("./data/movies.json");

const getReq = require("./methods/get-request");
const postReq = require("./methods/post-request");
const putReq = require("./methods/put-request");
const deleteReq = require("./methods/delete-request");

const port = process.env.PORTs || 5010;

const server = http.createServer((request, response) => {
  request.movies = movies;
  switch (request.method) {
    case "GET":
      getReq(request, response);
      break;
    case "POST":
      postReq(request, response);
      break;
    case "PUT":
      putReq(request, response);
      break;
    case "DELETE":
      deleteReq(request, response);
      break;
    default:
      response.statusCode = 404;
      response.setHeader("Content-Type", "application/json");
      response.write(
        JSON.stringify({
          title: "Not Found",
          message: "This is the message set from the server header",
        })
      );
      response.end();
  }
});

server.listen(port, () => {
  console.log(`The server has started on port:${port}`);
});
