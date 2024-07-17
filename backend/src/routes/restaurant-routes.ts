import { addBooking } from "../controllers/booking-controller";
import { getRestaurantList } from "../controllers/restaurant-controller";
const express = require("express");
const router = express.Router();

router.get("/getRestaurantList", getRestaurantList);
router.post("/addRestaurantBooking", addBooking);

export default router