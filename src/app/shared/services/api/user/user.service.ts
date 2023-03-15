import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser, UserFilter } from 'src/app/shared/core/models/app-user';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) { }

  getUsers(data: any): Observable<PaginationResponse<AppUser[]>> {
    return this.http.post<PaginationResponse<AppUser[]>>(`${this.apiUrl}`, data);
  }

  editPersonalDetails(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/personal`, data);
  }

  editNextOfKin(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/next-of-kin`, data);
  }

  getFiles(userId?: string, userFileId?: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/files?userId=${userId}&userFileId=${userFileId}`);
  }

  addFiles(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/files`, data);
  }

  deleteFile(data: any): Observable<any> {
    return this.http.request( 'delete', `${this.apiUrl}/files`, { body: data });
  }

  getIndividualCompany(): Observable<PaginationResponse<AppUser[]>> {
    const appPagination = new AppPagination();
    const filter = new UserFilter('company');
    filter.forIndividual = true;
    const paginationRequest = new PaginationRequest<UserFilter>(appPagination, filter);
    return this.getUsers(paginationRequest);
  }
}
