export interface IRestaurant {
    id: number;
    restaurantName: string;
    img: string;
    tableSize: number[];
    tableLocation: string[];
    timeSlot: string[];
}

export interface IBooking {
    id: number;
    restaurantId: number;
    restaurantName: string;
    tableSize: string;
    tableLoc: string;
    date: string;
    time: string;
}
