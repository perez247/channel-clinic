import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppTicket } from 'src/app/shared/core/models/app-ticket';
import { PaginationResponse } from 'src/app/shared/core/models/pagination';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = `${environment.apiUrl}/ticket`;

  constructor(private http: HttpClient) { }

  getTickets(data: any): Observable<PaginationResponse<AppTicket[]>> {
    return this.http.post<PaginationResponse<AppTicket[]>>(`${this.apiUrl}/get-tickets`, data);
  }

  saveTicketAndInventory(data: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/pharmacy-ticket-inventory`, data);
  }

  updateTicket(data: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}`, data);
  }

  sendAllTickets(data: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/send-to-departments`, data);
  }

  sendPharmacyTicketToFinance(data: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/send-pharmacy-to-finance`, data);
  }

  concludePharmacyTicket(data: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/conclude-pharmacy-ticket-inventory`, data);
  }
}
