import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant-list-model";

const getRestaurantList = async (req: Request, res: Response) => {
    try {
      const restrauntList = await Restaurant.findAll();
      if(restrauntList) {
        res.status(200).json(restrauntList);
      }
    } catch (error) {
        console.log("Error is", error);
    }
}

export { getRestaurantList }    