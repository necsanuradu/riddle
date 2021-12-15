var express = require("express");
var router = express.Router();
var fs = require("fs");

router.post("/", function (req, res, next) {
  // res.render("index", { text: "red" });

  console.log(
    process.cwd() + req.body.component.path.replace(/\.js$/, "") + ".js"
  );

  fs.writeFile(
    process.cwd() + req.body.component.path.replace(/\.js$/, "") + ".js",
    req.body.component.content,
    function (err) {
      if (err) throw err;
      console.log("Saved!");
    }
  );
});

module.exports = router;
