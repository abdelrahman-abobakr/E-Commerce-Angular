export interface OrderResponse {
    message: string;
    orders: Order[];
}

export interface Order {
    _id: string;
    customerId: string;
    items: OrderItem[];
    totalBill: number;
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    itemID: string;
    quantity: number;
    itemTotalPrice: number;
    _id: string;
}
