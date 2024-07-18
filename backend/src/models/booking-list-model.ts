import { sequelize } from "../../dbconfig";
import { IBooking, IRestaurant } from "../interfaces/restaurant-interface";
import { DataTypes, Model, Optional } from "sequelize";

interface IBookingAttributes extends Optional<IBooking, "id"> { }

interface IBookingInstance extends Model<IBooking, IBookingAttributes>, IBooking {
    createdAt?: Date;
    updatedAt?: Date;
}

const Booking = sequelize.define<IBookingInstance>("Booking_List", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    restaurantName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tableSize: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tableLoc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Booking.sync({ force: false }).then(() => { });

export { Booking }