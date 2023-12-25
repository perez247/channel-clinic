import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILookUp } from 'src/app/shared/core/models/app-constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  getLookUps(): Observable<ILookUp[]> {
    return this.http.get<ILookUp[]>(`${this.apiUrl}/lookups`);
  }

  signIn(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signin`, data);
  }

  changePassword(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/change-password`, data);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/reset-password`, data);
  }

}
