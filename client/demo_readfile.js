var http = require("http");
var fs = require("fs");
http
  .createServer(function (req, res) {
    //read file
    fs.readFile("demofile1.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
    //write to file
    fs.writeFile("mynewfile3.txt", "Hello content!", function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
    //delete file
    // fs.unlink("mynewfile3.txt", function (err) {
    //   if (err) throw err;
    //   console.log("File deleted!");
    // });
  })
  .listen(8080);
