export interface Restraunt {
    id: number;
    name: string;
    img: string;
    tableType: number[];
    availableSeats: number;
}

export interface Appointment {
    id: number;
    restrauntId: number;
    restrauntName: string;
    tableSize: string;
    tableLoc: string;
    date: string;
    time: string;
}