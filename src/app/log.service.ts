import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LogService {
headers = new Headers(
        {'Content-Type': 'application/json',
            'Accept': 'application/json'
        });

  constructor(private http: Http) { }

  logError(taskErr: string){
        return this.http.post('http://localhost:3000/api/error', 
                            JSON.stringify(taskErr), 
                            {headers: this.headers})
        .map(this.suceessResponse)
        .catch(this.handleError);
    }

    private suceessResponse(res: Response){
      return res;
    }

    private handleError (error: Response | any) {
      // In a real world app, you might use a remote logging infrastructure
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Observable.throw(errMsg);
  }


}
