const requesBodyParser = require("../util/body-parser");
const writeToFile = require("../util/write-to-file");
module.exports = async (request, response) => {
  let baseUrl = request.url.substring(0, request.url.lastIndexOf("/") + 1);
  let id = request.url.split("/")[3];
  const regexV4 = new RegExp(
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
  );

  if (!regexV4.test(id)) {
    response.writeHead(400, { "Content-Type": "application/json" });
    response.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "UUID is not valid",
      })
    );
  } else if (baseUrl === "/api/movies/" && regexV4.test(id)) {
    try {
      let body = await requesBodyParser(request);
      const index = request.movies.findIndex((movie) => {
        return movie.id === id;
      });
      if (index === -1) {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify({
            title: "Not Found",
            message: "Route not found",
          })
        );
        response.end();
      } else {
        request.movies[index] = { id, ...body };
        writeToFile(request.movies);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(request.movies[index]));
      }
    } catch (err) {
      console.log(err);
      response.writeHead(40, { "Content-Type": "application/json" });
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
