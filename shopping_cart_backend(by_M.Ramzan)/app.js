let express = require("express");
let mongoDB = require("./database/connection");
let cors = require("cors");
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("./uploads"));
app.use(cors());
require("dotenv").config();
let mrgn = require("morgan");
let userRouter = require("./router/user.index");

let port = process.env.PORT;

//log request
app.use(mrgn("dev"));

//User Routes Path
app.use("/user", userRouter);
//admin Routes Path



const start = async () => {
  try {
      await mongoDB();
      app.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`);
      });
  } catch (error) {
      console.log(error);
      console.log("Failed to connect to the database, server is not running.");
  }
};

start();