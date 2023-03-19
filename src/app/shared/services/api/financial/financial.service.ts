import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
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
    return this.http.put<any>(`${this.apiUrl}/initial-payment`, data)
    .pipe(timeout(environment.timeOut));
  }

  updatePatientPayment(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-patient-payment`, data)
    .pipe(timeout(environment.timeOut));
  }

  getContracts(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/get-contracts`, data)
    .pipe(timeout(environment.timeOut));
  }

  updateContract(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-contract`, data)
    .pipe(timeout(environment.timeOut));
  }

  debts(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/debts`, data)
    .pipe(timeout(environment.timeOut));
  }

  paid(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/paid`, data)
    .pipe(timeout(environment.timeOut));
  }
}
