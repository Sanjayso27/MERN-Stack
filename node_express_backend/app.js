const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// this we can now use as a middleware
const placesRoutes = require("./routes/place-routes");
const usersRoutes = require("./routes/user-routes");
const HttpError = require("./models/http-error");

const app = express();
// middlewares parsed from top to bottom
// this will parse any incoming request body and extract info into objects and arrays and call next() and add the json there
app.use(bodyParser.json());

// // now on every route request the logic inside place-routes is run
// app.use(placesRoutes);

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  throw new HttpError("Couldn't find the requested page!", 404);
});

// special middleware error function with 4 params
// this function will exec any middleware function infront of it yields an error
app.use((error, req, res, next) => {
  // we check whether a response has already been sent
  if (res.headerSent) {
    // forward the error to the next error handling middleware function(??)
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown error occured!" });
});

mongoose
  .connect('mongodb+srv://Sanjay:Sanjay@cluster0.lmkqy.mongodb.net/places?retryWrites=true&w=majority')
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
