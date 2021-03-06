const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");

//Strategies
const { localStrategy, jwtStrategy } = require("./middleware/passport");

//DB
const db = require("./db");

//Routes
const plantRoutes = require("./routes/plants");
const vendorRoutes = require("./routes/vendors");
const userRoutes = require("./routes/users");

//Create Express App Instance
const app = express();

app.use(cors());
app.use(bodyParser.json());

//Passport
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//Routers
app.use("/plants", plantRoutes);
app.use("/vendors", vendorRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(userRoutes);

//Not Found Paths
app.use((req, res, next) => {
  const error = new Error("Path Not Found");
  error.status = 404;
  next(error);
});

//Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err.message || "Internal Server Error");
});

const run = async () => {
  try {
    await db.sync({});
    /*force: true*/
    /*alter: true : we do it only once*/
  } catch (error) {
    console.error("run -> error", error);
  }

  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
