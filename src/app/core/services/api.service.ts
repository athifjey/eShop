import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as env from '../../../../config/env.json';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = env["api"].baseURL;

  constructor(private http: HttpClient) { }

  // To get all orders
  public getOrders() {
    console.log(this.apiURL, '0000')
    let tempURL = this.apiURL + 'api/orders';
    return this.http.get(`${tempURL}`);
  }

  // To update order byb its orderid
  public putOrderByID(orderID, formData) {
    let tempURL = this.apiURL + 'api/orders/' + orderID;
    return this.http.put(`${tempURL}`, formData);
  }

  // To add a new order
  public postOrder(formData) {
    let tempURL = this.apiURL + 'api/orders';
    return this.http.post(`${tempURL}`, formData);
  }

  // TO delete an order
  public deleteOrder(orderID) {
    let tempURL = this.apiURL + 'api/orders/' + orderID;
    return this.http.delete(`${tempURL}`);
  }
}
