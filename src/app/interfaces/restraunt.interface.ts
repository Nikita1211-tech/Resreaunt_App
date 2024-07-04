export interface Restraunt {
    id: number;
    name: string;
    img: string;
    tableType: number[];
    availableSeats: number;
}

export interface TableType {
    oneSeaterTable: number;
    twoSeaterTable: number;
    fourSeaterTable: number;
    sixSeaterTable: number;
}