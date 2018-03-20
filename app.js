const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./ws/routes/routes.js");

const app = express();
app.use(bodyParser.json());

routes(app);

app.listen(3000, () => {
  console.log("The sickest app ever is listening on port 3000!");
});
