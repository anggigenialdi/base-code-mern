const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path")
const swaggerUi = require("swagger-ui-express");
const apiDocumentation = require("../apidocs.json");


const { connectDB } = require("./config/db");
const {  userRoute } = require("./api/v1");

const app = express();

dotenv.config();

app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(apiDocumentation) )

app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "./public/")))



app.use("/v1/users", userRoute);


app.get("/", (req, res) => {
  res.json({
    message: "Welcome!",
  });
});

connectDB().then(() => {
  console.log("Established MongoDB Connection!");

  app.listen(process.env.PORT, () => {
    console.log("Server running in port 3001");
  });
});
