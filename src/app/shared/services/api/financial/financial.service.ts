import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { AppTicket } from 'src/app/shared/core/models/app-ticket';
import { AppPaid } from 'src/app/shared/core/models/financial';
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
    // .pipe(timeout(environment.timeOut));
  }

  getBillTotal(data: any): Observable<any> {
    const params = '?' + new URLSearchParams(data).toString();
    return this.http.get<any>(`${this.apiUrl}/get-total-bill${params}`)
    // .pipe(timeout(environment.timeOut));
  }

  billClient(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bill-client`, data)
    // .pipe(timeout(environment.timeOut));
  }

  updatePatientPayment(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-patient-payment`, data)
    // .pipe(timeout(environment.timeOut));
  }

  getContracts(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/get-contracts`, data)
    // .pipe(timeout(environment.timeOut));
  }

  updateContract(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-contract`, data)
    // .pipe(timeout(environment.timeOut));
  }

  debts(data: any): Observable<PaginationResponse<any>> {
    return this.http.post<PaginationResponse<any>>(`${this.apiUrl}/debts`, data)
    // .pipe(timeout(environment.timeOut));
  }

  paid(data: any): Observable<PaginationResponse<AppPaid[]>> {
    return this.http.post<PaginationResponse<AppPaid[]>>(`${this.apiUrl}/paid`, data)
    // .pipe(timeout(environment.timeOut));
  }

  addRecord(data: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/save-record`, data);
    // .pipe(timeout(environment.timeOut));
  }

  payDebt(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/debt-payment`, data)
    // .pipe(timeout(environment.timeOut));
  }

  getRevenue(data: any): Observable<{ expense: number, profit: number, totalExpense: number, totalProfit: number }> {
    const params = '?' + new URLSearchParams(data).toString();
    return this.http.get<{ expense: number, profit: number, totalExpense: number, totalProfit: number  }>(`${this.apiUrl}/revenue-cost${params}`)
    // .pipe(timeout(environment.timeOut));
  }
}
