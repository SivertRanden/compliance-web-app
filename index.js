const express = require("express");
const bodyParser = require("body-parser");

const dao = require("./ws/dao");

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

//Start start
app.listen(3000, () => console.log("Example app listening on port 3000!"));
