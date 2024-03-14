import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdmissionPrescription } from 'src/app/shared/core/models/admission-prescription';
import { AdmissionStats } from 'src/app/shared/core/models/app-admission-stats';
import { PaginationResponse } from 'src/app/shared/core/models/pagination';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {

  private apiUrl = `${environment.apiUrl}/admission`;

  constructor(private http: HttpClient) { }

  getStats(ticketId: string): Observable<AdmissionStats> {
    return this.http.get<AdmissionStats>(`${this.apiUrl}?ticketId=${ticketId}`);
  }

  createPrescription(data: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/prescription`, data);
  }

  getPrescriptions(data: any): Observable<PaginationResponse<AdmissionPrescription[]>> {
    return this.http.post<PaginationResponse<AdmissionPrescription[]>>(`${this.apiUrl}/get-prescriptions`, data);
  }

  deletePrescription(data: any): Observable<void> {
    return this.http.request<void>('delete', `${this.apiUrl}/prescription`, { body: data });
  }

  executePrescription(data: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/execute-prescription`, data);
  }
}
