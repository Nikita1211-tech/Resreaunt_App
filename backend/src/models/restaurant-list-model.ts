import { sequelize } from "../../dbconfig";
import { IRestaurant } from "../interfaces/restaurant-interface";
import { ARRAY, DataTypes, Model, Optional } from "sequelize";

interface IRestaurantAttributes extends Optional<IRestaurant, "id"> { }

interface IRestaurantInstance extends Model<IRestaurant, IRestaurantAttributes>, IRestaurant {
  createdAt?: Date;
  updatedAt?: Date;
}

const Restaurant = sequelize.define<IRestaurantInstance>("Restaurant_List", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurantName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tableSize: {
    type: DataTypes.ARRAY(DataTypes.NUMBER),
    allowNull: false
  },
  tableLocation: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  timeSlot: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  }
})

Restaurant.sync({ force: false }).then(() => { });

export { Restaurant }