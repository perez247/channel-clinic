import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private apiUrl = `${environment.apiUrl}/inventory`;

  constructor(private http: HttpClient) { }

  createInventory(data: any): Observable<{inventoryId: string}> {
    return this.http.post<{inventoryId: string}>(`${this.apiUrl}`, data);
  }

  getInventories(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/inventories`, data);
  }

  getInventoryItems(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/inventory-items`, data);
  }

  saveInventoryItems(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/inventory-item`, data);
  }

  getInventoryItemPrices(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/inventory-item-prices`, data);
  }

  updateSurgeryInventory(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/surgery-inventory`, data);
  }
}
