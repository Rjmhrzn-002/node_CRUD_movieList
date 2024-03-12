const crypto = require("crypto");
const requestBodyparser = require("../util/body-parser");
const writeToFile = require("../util/write-to-file");
module.exports = async (request, response) => {
  if (request.url === "/api/movies") {
    try {
      let body = await requestBodyparser(request);
      body.id = crypto.randomUUID();
      request.movies.push(body);
      writeToFile(request.movies);
      response.writeHead(201, { "Content-Type": "application/json" });
      console.log("Request body:", body);
      response.end();
    } catch (error) {
      console.log(err);
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end(
        JSON.stringify({
          title: "Validation Failed",
          message: "Request body is not valid",
        })
      );
    }
  } else {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(
      JSON.stringify({
        title: "Not Found",
        message: "Route not found",
      })
    );
  }
};
