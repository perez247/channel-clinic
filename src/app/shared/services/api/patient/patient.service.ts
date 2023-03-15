import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationResponse } from 'src/app/shared/core/models/pagination';
import { PatientVital } from 'src/app/shared/core/models/patient';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = `${environment.apiUrl}/patient`;

  constructor(private http: HttpClient) { }

  createPatient(data: any): Observable<{userId: string}> {
    return this.http.post<{userId: string}>(`${this.apiUrl}/create`, data);
  }

  updateAllergies(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/allergies`, data);
  }

  addVital(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/vital`, data);
  }

  getVitals(data: any): Observable<PaginationResponse<PatientVital[]>> {
    return this.http.post<PaginationResponse<PatientVital[]>>(`${this.apiUrl}/vitals`, data);
  }

  addContract(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/contract`, data);
  }

  updateCompany(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/patient-company`, data);
  }
}
