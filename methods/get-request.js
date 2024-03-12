module.exports = (request, response) => {
  let baseUrl = request.url.substring(0, request.url.lastIndexOf("/") + 1);
  let id = request.url.split("/")[3];
  const regexV4 = new RegExp(
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
  );

  if (request.url === "/api/movies") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.write(JSON.stringify(request.movies));
    response.end();
  } else if (!regexV4.test(id)) {
    response.writeHead(400, { "Content-Type": "application/json" });
    response.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "UUID is not valid",
      })
    );
  } else if (baseUrl === "/api/movies/" && regexV4.test(id)) {
    response.setHeader("Content-Type", "application/json");
    let filteredMovie = request.movies.filter((movie) => {
      return movie.id === id;
    });
    if (filteredMovie.length > 0) {
      response.statusCode = 200;
      response.write(JSON.stringify(filteredMovie));
      response.end();
    } else {
      response.statusCode = 404;
      response.write(
        JSON.stringify({
          title: "Not Found",
          message: "Route not found",
        })
      );
      response.end();
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
