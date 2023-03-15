import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalJWTToken } from '../core/models/jwtToken';
import { EventBusService } from '../services/common/event-bus/event-bus.service';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
      private eventBus: EventBusService
      ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.url.includes('signin')) {
          return next.handle(request);
        }

        let token = this.eventBus.getState()?.jwt?.value?.jwt;

        // if (!environment.production) {
        //     token = LocalJWTToken;
        // }

        // console.log(Object.keys(token).length);

        // if (!_.isEmpty(token) && !token.isExpired) {
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}

export const JwtInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true,
    deps: [EventBusService]
};
