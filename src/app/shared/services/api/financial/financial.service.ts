import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppTicket } from 'src/app/shared/core/models/app-ticket';
import { PaginationResponse } from 'src/app/shared/core/models/pagination';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {

  private apiUrl = `${environment.apiUrl}/financial`;

  constructor(private http: HttpClient) { }

  initialPayment(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/initial-payment`, data);
  }

  updatePayment(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-payment`, data);
  }

  getContracts(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/get-contracts`, data);
  }

  updateContract(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-contract`, data);
  }
}
