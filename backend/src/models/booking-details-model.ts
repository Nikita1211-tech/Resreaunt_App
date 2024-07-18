import { sequelize } from "../../dbconfig";
import { DataTypes, Model, Optional } from "sequelize";

interface IBookingDetailsAttributes extends Optional<IBookingDetails, "id"> { }

interface IBookingDetailsInstance extends Model<IBookingDetails, IBookingDetailsAttributes>, IBookingDetails {
    createdAt?: Date;
    updatedAt?: Date;
}

const bookingDetails = sequelize.define<IBookingDetailsInstance>("Booking_Details", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tableSize: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tableLoc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timeSlot: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

bookingDetails.sync({ force: false }).then(() => { });

export { bookingDetails }