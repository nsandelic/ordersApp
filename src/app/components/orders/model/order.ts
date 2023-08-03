

export interface Order {

    id: number;
    name: String;
    customer: String;
    status: Boolean; // 1 Otvoreno, 0 Zatvoreno
    date: Date;
    price: number;

}
