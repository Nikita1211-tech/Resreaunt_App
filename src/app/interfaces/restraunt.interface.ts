export interface Restraunt {
    id: number;
    restaurantName: string;
    img: string;
    tableSize: string;
    tableLocation: string;
    timeSlot: string
}

export interface RestaurantDetails {
    restaurantName: string;
    tableSize:  string[];
    tableLocation: string[];
    timeSlot: string[];
}

export interface Booking {
    id: number;
    restrauntId: number;
    restrauntName: string;
    tableSize: string;
    tableLoc: string;
    date: string;
    time: string;
}