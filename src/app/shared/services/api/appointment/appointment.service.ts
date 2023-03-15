import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppAppointmentCount } from 'src/app/shared/core/models/app-appointment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = `${environment.apiUrl}/appointment`;

  constructor(private http: HttpClient) { }

  getAppointmentsByDate(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/appointment-by-date`, data);
  }

  getAppointmentsCountByMonth(data: any): Observable<AppAppointmentCount[]> {
    return this.http.post<AppAppointmentCount[]>(`${this.apiUrl}/appointment-count-in-mmonth`, data);
  }

  createPatientAppointment(data: any): Observable<{appointmentId: string}> {
    return this.http.post<{appointmentId: string}>(`${this.apiUrl}`, data);
  }

  updateAppointment(data: any): Observable<{appointmentId: string}> {
    return this.http.put<{appointmentId: string}>(`${this.apiUrl}`, data);
  }

}
