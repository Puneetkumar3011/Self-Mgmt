import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { TaskModel } from './task.model';

@Injectable()
export class TaskService {
  tasks : Array<TaskModel> = [];
  headers = new Headers(
        {'Content-Type': 'application/json',
            'Accept': 'application/json'
        });

  constructor(private http: Http) { }

  getTasks(): Observable<TaskModel[]> {
      return this.http.get('http://localhost:3000/api/task')
        .map(this.extractData)
        .catch(this.handleError); 
  }

  getTask(id: string): Observable<TaskModel> {
      return this.http.get('http://localhost:3000/api/task/' + id)
        .map(this.extractData)
        .catch(this.handleError); 
  }

  addTask(task: TaskModel){
        return this.http.post('http://localhost:3000/api/task', 
                            JSON.stringify(task), 
                            {headers: this.headers})
        .map(this.suceessResponse)
        .catch(this.handleError);
    }

  updateTask(task: TaskModel){
      return this.http.patch('http://localhost:3000/api/task/' + task.id, 
                          JSON.stringify(task), 
                          {headers: this.headers})
      .map(this.suceessResponse)
      .catch(this.handleError);
  }

  deleteTask(task: TaskModel) {
      return this.http.delete('http://localhost:3000/api/task/' + task.id)
      .map(this.suceessResponse)
      .catch(this.handleError);
  }

  private suceessResponse(res: Response){
    return res;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
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
