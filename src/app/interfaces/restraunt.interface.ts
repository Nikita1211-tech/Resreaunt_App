export interface Restraunt {
    id: number;
    name: string;
    img: string;
    tableSize: number[];
    tableLocation: string[];
    timeSlot: string[]
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