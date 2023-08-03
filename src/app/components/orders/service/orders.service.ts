import { Injectable } from '@angular/core';
import {MOCK_ORDERS} from "../order-data.mock";
import {Order} from "../model/order";
import {collectionSnapshots} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private STORAGE_KEY = 'users';
  // @ts-ignore
  private orders: Order[];

  constructor() {
    const storedOrders = localStorage.getItem(this.STORAGE_KEY);
    this.orders = storedOrders ? JSON.parse(storedOrders) : MOCK_ORDERS;
  }


  getOrders(): Order[] {
    return this.orders;
  }

  addOrder(newOrder: Order): void {
    const nextId = Math.max(...this.orders.map(order => order.id)) + 1;
    newOrder.id = nextId;
    this.orders.push(newOrder);
    this.saveToStorage();
    console.log("Order added with ID: " + nextId );
  }

  updateOrder(updateOrder: Order): void {
    const index = this.orders.findIndex(order => order.id === updateOrder.id);
    if (index !== -1) {
      this.orders[index] = { ...updateOrder };
      this.saveToStorage();
    }
  }

  deleteOrder(id: number): void {
    this.orders = this.orders.filter(order => order.id !== id);
    this.saveToStorage();

  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.orders ));
  }

}
