const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//Routers
let router = require("./routes/plants");

//Create Express App Instance
const app = express();
app.use(bodyParser.json());

const plantRoutes = require("./routes/plants");
app.use(plantRoutes);

app.use(cors());

app.listen(8000);

module.exports = router;
