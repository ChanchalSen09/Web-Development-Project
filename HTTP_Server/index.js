const fs = require("fs");
const http = require("http");
const myserver = http.createServer((req, res) => {
  const date = new Date();
  const log = `${date.toString()} is New Entry  and url is ${req.url}\n`;
  fs.appendFile("log.txt", log, (error, data) => {
    switch (req.url) {
      case "/":
        res.end("HomePage");
        break;
      case "/about":
        res.end("Chanchal Sen");
        break;
      default:
        res.end("404");
    }
  });
});

myserver.listen(8000, () => {
  console.log("WE start");
});
