import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { CustomToastService } from '../services/common/custom-toast/custom-toast.service';
import { EventBusService } from '../services/common/event-bus/event-bus.service';
import { ApplicationRoutes } from '../core/routes/app-routes';
import { AppServerError } from '../core/models/jwtToken';
import { UtilityHelpers } from '../core/functions/utility-helpers';

@Injectable()

/**
 * Class to catch all kind of http error send from the server
 */
 export class ErrorInterceptor implements HttpInterceptor {

    routes = ApplicationRoutes.generateRoutes();

    constructor(
      private router: Router,
      private redux: EventBusService,
      private notify: CustomToastService,
      private modalService: NgbModal,
      private route: ActivatedRoute
      ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(


            catchError((error) => {

              // if (!environment.production) {
              //   console.log(error);
              // }

              if (error instanceof HttpErrorResponse) {

                    if (error.status === 428) {

                      // Get the application error
                      // const serverError = error.error as IServerError;

                      // Display errror - email is not yet confirmed
                      // this.notify.error(serverError.error);


                      // Redirect to email verification page
                      this.router.navigate([this.routes.publicRoute.sendEmailVerification().$absolutePath]);

                      // Throw error back
                      throw error;
                    }

                    // If user has unauthorized access then they have to go back to the sign in page to
                    // give credentials to have access
                    if (error.status === 401) {

                        this.redux.clearState();

                        this.router.navigate([this.routes.publicRoute.signIn().$absolutePath], {
                            queryParams : {
                            returnUrl : this.router.url
                            }
                        });

                        throw error;
                    }

                    // If its a 400 error then check for or error
                    if (error.status === 400 || error.status === 500 || error.status === 500) {
                      // console.log(error);

                      UtilityHelpers.showError(error, this.notify);

                    }

                    if (error.status === 404) {

                      console.log(error);

                        const errorMessage = UtilityHelpers.showError(error, this.notify);

                        if (this.router.url.includes('private'))
                        {
                            this.router.navigate(['/'+ this.routes.privateRoute.notfound(errorMessage).$absolutePath])
                        }
                    }

                    if (error.status === 0) {
                      throw error;
                    }

                    // If its an internal error from server then show the message send back from the server
                    // if (error.status === 500) {
                    //   const serverError = error.error as IServerError;

                    //   // If its a single error
                    //   if (serverError.error) {

                    //     // If length of error is <= 100 then present it
                    //     if (serverError.error.length <= 100) {
                    //       this.notify.error(serverError.error);

                    //       // else show default error and console log stack trace
                    //       // stacktrace will show in a development of staging environment
                    //     } else {
                    //       this.notify.error('It seems something went wrong, kindly try again later');

                    //       // Check if its not in production mode
                    //       if (serverError.environment !== AppConstants.EnvironmentFromServer.production) {
                    //         this.notify.error('Check console for error - stack trace: for developers only');
                    //         console.log(serverError);
                    //       }
                    //     }
                    //   }

                    //   // Throw error back
                    //   return throwError(error);
                    // }

                    // if (error.status === 404) {

                    //   const serverError = error.error as AppServerError;

                    //   // console.log(error.error);

                    //   this.router.navigate([this.routes.notFound]);
                    //   this.modalService.dismissAll();

                    //   this.notify.error(serverError.error);

                    //   return;
                    // }
                }

            //   if (!environment.production) {
            //     console.log(error);
            //   }

              throw error;
            })

        );
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
