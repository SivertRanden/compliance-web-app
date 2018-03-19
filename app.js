const express = require("express");
const bodyParser = require("body-parser");

const dao = require("./ws/dao/db.js");

//Controllers
const lawsController = require("./ws/controllers/laws");
const paragraphsController = require("./ws/controllers/paragraphs");
const regulationsController = require("./ws/controllers/regulations");

// App setup
dao.initDb();

const app = express();
app.use(bodyParser.json());

//Routes
app.get("/", (req, res) => res.send("Hello World!"));

app.get("/laws", lawsController.getLaws);

app.get("/test", function(req, res) {
  console.log(req.originalUrl);
  console.log("Who you not work?");
  res.send("This is not a test");
});

app.get("/oivind/:id", (req, res) => {
  res.send("Øivind er en tissemann med en " + req.params.id + " cm lang tiss");
});

app.post("/posttest", (req, res) => {
  let testparam = req.query.id;
  console.log(req);
  res.send("Hallo? " + testparam);
});

//Start start
app.listen(3000, () => console.log("Example app listening on port 3000!"));
