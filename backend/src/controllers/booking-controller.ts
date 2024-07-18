import { Request, Response } from "express";
import { Booking } from "../models/booking-list-model";
import { BOOKING_ADDED, BOOKING_DELETED, BOOKING_NOT_FOUND, BOOKING_UPDATED, INTERNAL_SERVER_ERROR, RESTAURANT_BOOKING_ERROR } from "../enum/booking-enum";

// Fetches ooking list from database 
const getBookingList = async (req: Request, res: Response) => {
    try {
        const bookingList = await Booking.findAll();
        if(bookingList) {
           return res.status(200).json(bookingList);
        }
        else {
            // return res.status(401).json({ error: "No bookings available" });
        }
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

// Adds booking in database 
const addBooking = async (req: Request, res: Response) => {
    try {
        const obj = {
            restaurantId: req.body.restaurantId,
            restaurantName: req.body.restaurantName,
            tableSize: req.body.tableSize,
            tableLoc: req.body.tableLoc,
            date: req.body.date,
            time: req.body.time
        }
        const newBookingDetail = await Booking.create(obj);
        if (newBookingDetail) {
            return res.status(200).json({message: BOOKING_ADDED});
        }
        else {
            return res.status(401).json({ error: RESTAURANT_BOOKING_ERROR });
        }
    } catch (error) {
        return res.status(400).json({ error: INTERNAL_SERVER_ERROR });
    }
}

// Updates booking by id 
const updateBooking = async(req: Request, res: Response) => {
    try {
        const bookingId = req.body.id;
        const obj = {
            restaurantName: req.body.restaurantName,
            tableSize: req.body.tableSize,
            tableLoc: req.body.tableLoc,
            date: req.body.date,
            time: req.body.time
        }
        const updatedBooking = await Booking.findByPk(bookingId);
        if(updatedBooking) {
            updatedBooking.restaurantName = obj.restaurantName;
            updatedBooking.tableSize = obj.tableSize;
            updatedBooking.tableLoc = obj.tableLoc;
            updatedBooking.date = obj.date;
            updatedBooking.time = obj.time;
            updatedBooking.save();
            return res.status(200).json({message: BOOKING_UPDATED});
        }
        else {
            return res.status(404).json({error: BOOKING_NOT_FOUND});
        }
    } catch (error) {
        return res.status(500).json({error: INTERNAL_SERVER_ERROR});
    }
}

// Deletes booking by id 
const deleteBooking = async(req: Request, res: Response) => {
    try {
        const bookingId = req.params.id;
        const deletedRestaurantBooking = await Booking.findByPk(bookingId);
        if(deletedRestaurantBooking) {
            deletedRestaurantBooking.destroy();
            return res.status(200).json({message: BOOKING_DELETED});
        }
        else {
            return res.status(404).json({error: BOOKING_NOT_FOUND});
        }
    } catch (error) {
         return res.status(500).json({error: INTERNAL_SERVER_ERROR});
    }
}

export { getBookingList, addBooking, updateBooking, deleteBooking }