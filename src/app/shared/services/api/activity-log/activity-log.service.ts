import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityLog } from 'src/app/shared/core/models/activity-log';
import { PaginationResponse } from 'src/app/shared/core/models/pagination';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {

  private apiUrl = `${environment.apiUrl}/activitylog`;

  constructor(private http: HttpClient) { }

  getLogs(data: any): Observable<PaginationResponse<ActivityLog[]>> {
    return this.http.post<PaginationResponse<ActivityLog[]>>(`${this.apiUrl}/get-logs`, data);
  }
}
