import { UtilityHelpers } from 'src/app/shared/core/functions/utility-helpers';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { EventBusService } from './../services/common/event-bus/event-bus.service';
import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomToastService } from '../services/common/custom-toast/custom-toast.service';
import { AppInjector } from 'src/app/app.module';
// import { NotifyService } from '../services/common/notify/notify.service';

@Injectable({
  providedIn: 'root'
  })
export class AppErrorHandler implements ErrorHandler {

    constructor(
      // @Inject(CustomToastService) private toastService: CustomToastService
      ) {}

    handleError(error: any): void {
      const toast = AppInjector.get(CustomToastService);

      if (typeof(error) === 'string') {
        toast.error(error)
      }

      if (error instanceof HttpErrorResponse)
      {
        UtilityHelpers.showError(error, toast);
      }
    }

}

export const AppErrorInterceptorProvider = {
    provide: ErrorHandler,
    useClass: AppErrorHandler
};
