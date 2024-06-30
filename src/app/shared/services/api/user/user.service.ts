import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom, timeout } from 'rxjs';
import { AppUser, UserFilter } from 'src/app/shared/core/models/app-user';
import { AppPagination, PaginationContext, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { environment } from 'src/environments/environment';
import { EventBusService } from '../../common/event-bus/event-bus.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient, private eventBus: EventBusService) { }

  getUsers(data: any): Observable<PaginationResponse<AppUser[]>> {
    return this.http.post<PaginationResponse<AppUser[]>>(`${this.apiUrl}`, data);
    // .pipe(timeout(environment.timeOut));
  }

  editPersonalDetails(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/personal`, data)
    .pipe(timeout(environment.timeOut));
  }

  editNextOfKin(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/next-of-kin`, data)
    .pipe(timeout(environment.timeOut));
  }

  getFiles(userId?: string, userFileId?: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/files?userId=${userId}&userFileId=${userFileId}`)
    .pipe(timeout(environment.timeOut));
  }

  addFiles(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/files`, data)
    .pipe(timeout(environment.timeOut));
  }

  deleteFile(data: any): Observable<any> {
    return this.http.request( 'delete', `${this.apiUrl}/files`, { body: data })
    .pipe(timeout(environment.timeOut));
  }

  getIndividualCompany(): Observable<PaginationResponse<AppUser[]>> {
    const appPagination = new AppPagination();
    const filter = new UserFilter('company');
    filter.forIndividual = true;
    const paginationRequest = new PaginationRequest<UserFilter>(appPagination, filter);
    return this.getUsers(paginationRequest);
  }

  hasRoles(roles: string[], and: boolean): boolean {
    const user = new AppUser(this.eventBus.state.user.value || {});
    return user.hasClaim(roles, and);
  }

  async getInternalStaff(): Promise<AppUser[] | undefined> {
    const pagination = new PaginationContext<AppUser, UserFilter>();
    pagination.initialize();
    pagination.request?.setPagination({ pageSize: 500 });
    pagination.request?.setFilter({ userType: 'staff' });
    const data = await lastValueFrom(this.getUsers(pagination.request));
    return data.result;
  }
}
