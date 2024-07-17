import { Request, Response } from "express";
import { Booking } from "../models/booking-list-model";

const addBooking = async(req: Request, res: Response) => {
    try {
        const obj = {
            restaurantId: req.body.restaurantId, 
            restaurantName: req.body.restaurantName, 
            tableSize: req.body.tableSize, 
            tableLoc: req.body.tableLoc, 
            date: req.body.date, 
            time: req.body.time
        }
        console.log(obj);
        const newBookingDetail = await Booking.create(obj);
        console.log(newBookingDetail);
    } catch (error) {
        
    }
}

export { addBooking }