const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
  //   console.log(req);
  console.log("request made");

  //   set header content-type
  res.setHeader("Content-Type", "text/html");

  // routing
  let path = "./views";
  switch (req.url) {
    case "/":
      path += "/index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "/about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "/404.html";
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, data) => {
    err ? console.log(err) : res.write(data);
    res.end();
  });

  //   res.end();
});

server.listen(3000, "localhost", () => {
  console.log("listening for requests on port 3000");
});
