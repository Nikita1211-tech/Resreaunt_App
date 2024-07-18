import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant-list-model";

const getRestaurantList = async (req: Request, res: Response) => {
    try {
      const restrauntList = await Restaurant.findAll();
      if(restrauntList) {
        res.status(200).json(restrauntList);
      }
    } catch (error) {
      res.status(500).json({error: error});
    }
}

export { getRestaurantList }    