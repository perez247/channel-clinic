import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdmissionStats } from 'src/app/shared/core/models/app-admission-stats';
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
}
