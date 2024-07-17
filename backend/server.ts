const express = require("express");
const cors = require("cors");
import bodyParser from "body-parser";
import restaurantRoutes from "./src/routes/restaurant-routes";

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use(
  cors({
    origin: [
      "http://localhost:4200",
      "*",
    ],
  })
);
app.use("/restaurant", restaurantRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
