const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path")

const { connectDB } = require("./config/db");
const {  userRoute } = require("./api/v1");

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "./public/")))



app.use("/users", userRoute);


app.get("/", (req, res) => {
  res.json({
    message: "Welcome!",
  });
});
connectDB().then(() => {
  console.log("Established MongoDB Connection!");

  app.listen(process.env.PORT, () => {
    console.log("Server running in port 2022");
  });
});
