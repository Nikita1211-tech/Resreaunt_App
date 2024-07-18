import { addBooking, deleteBooking, getBookingList, updateBooking } from "../controllers/booking-controller";
import { getRestaurantList } from "../controllers/restaurant-controller";
const express = require("express");
const router = express.Router();

// Restaurant routes 
router.get("/getRestaurantList", getRestaurantList);

// Booking routes 
router.get("/getBookingList", getBookingList);
router.post("/addRestaurantBooking", addBooking);
router.put("/updateRestaurantBooking", updateBooking);
router.delete("/deleteRestaurantBooking/:id", deleteBooking);


export default router