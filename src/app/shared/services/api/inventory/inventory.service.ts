import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketInventory } from 'src/app/shared/core/models/app-ticket';
import { AppInventoryItem } from 'src/app/shared/core/models/inventory';
import { PaginationResponse } from 'src/app/shared/core/models/pagination';
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

  getInventoryItems(data: any): Observable<PaginationResponse<AppInventoryItem[]>> {
    return this.http.post<PaginationResponse<AppInventoryItem[]>>(`${this.apiUrl}/inventory-items`, data);
  }

  searchBulkUpload(data: any): Observable<PaginationResponse<AppInventoryItem[]>> {
    return this.http.post<PaginationResponse<AppInventoryItem[]>>(`${this.apiUrl}/search-bulk-upload`, data);
  }

  bulkUpload(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bulk-upload`, data);
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

  getTicketInventories(data: any): Observable<PaginationResponse<TicketInventory[]>> {
    return this.http.post<PaginationResponse<TicketInventory[]>>(`${this.apiUrl}/ticket-inventories`, data);
  }

  updateTicketInventory(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/ticket-inventory`, data);
  }

  concludeTicketInventory(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/conclude-inventory`, data);
  }

  updateQuantity(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update-quantity`, data);
  }

  setServicesEntered(ticketInventories: TicketInventory[]): { name: string, value: number }[] {
    const services: { name: string, value: number }[] = []
    ticketInventories.forEach(x => {
      const found = services.find(y => y.name == x.inventory.appInventoryType);
      if (found) {
        found.value++;
      } else {
        services.push({ name: x.inventory.appInventoryType || '', value: 1 });
      }
    });

    return services;
  }
}
