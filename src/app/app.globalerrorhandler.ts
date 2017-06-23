import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { Router } from "@angular/router";
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LogService } from './log.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
constructor(private injector: Injector) { }
handleError(error) {
    const logService = this.injector.get(LogService);
    const location = this.injector.get(LocationStrategy);
    let router = this.injector.get(Router);
    const message = error.message ? error.message : error.toString();
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    let errMessage = "Location: \n" + JSON.stringify(location) + "\nMessage: \n" + message + "\nUrl: \n" + url;

    let errorToLog = {
        message: errMessage
    };
    logService.logError(errorToLog).subscribe(() => {
        console.log(errorToLog);
    });

    setTimeout(() => {
        router.navigate(['/error']);
    });
  }
  
}