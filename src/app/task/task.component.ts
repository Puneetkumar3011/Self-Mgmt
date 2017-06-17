import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TaskModel } from './task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {
  //taskList: Array<TaskModel> = [];
  tasksObservable: Observable<TaskModel[]>;
  errorMsg : string;
  constructor(public taskService: TaskService) { }

  ngOnInit() {
  }

}
