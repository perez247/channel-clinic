import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiUrl = `${environment.apiUrl}/company`;

  constructor(private http: HttpClient) { }
  
  createCompany(data: any): Observable<{companyId: string}> {
    return this.http.post<{companyId: string}>(`${this.apiUrl}`, data);
  }

  addCompanyContract(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, data);
  }

  updateDetails(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/details`, data);
  }
}
