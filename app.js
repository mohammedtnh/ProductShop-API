const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const db = require("./db/models");

//Routs
const productRouts = require("./routes/products");
const shopRouts = require("./routes/shops");
const userRoutes = require("./routes/users");
const orderRoutes = require("./routes/orders");

const PORT = 8000;
const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//Routs
app.use("/products", productRouts);
app.use("/shops", shopRouts);
app.use(userRoutes);
app.use(orderRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

//Handle 404
app.use((req, res, next) => {
  console.log(req);
  const error = new Error("Path Not Found");
  error.status = 404;
  next(error);
});

//Handle Error
app.use((err, req, res, next) => {
  res.status(err.status ?? 500);
  res.json({ message: err.message ?? "Internal Server Error" });
});

//Sync DB and listen to port
const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(PORT, () => {
    console.log(`The application is running on localhost:${PORT}`);
  });
};

run();
