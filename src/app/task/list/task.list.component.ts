import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { TaskModel } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task.list.component.html'
})

export class TaskListComponent implements OnInit {
    tasks: Array<TaskModel> = [];
    
    constructor(private taskService: TaskService, private router: Router, private actRouter: ActivatedRoute) { }

    ngOnInit() {
      this.loadTaskList();  
    }

    loadTaskList(){
      this.taskService.getTasks().subscribe(
        (res: TaskModel[]) => {
          this.tasks = res;
        },
        (err: any) => {
          console.log('Error in calling getTaks. Error message ' + err);
        }
      );
    }

    editTask(task): void{
      this.router.navigate(['input', task._id], { relativeTo: this.actRouter });
    }

    deleteTask(task: TaskModel): void{
      this.taskService.deleteTask(task).subscribe(
        (res) => {
          this.loadTaskList();
          console.log('Deleted');
        },
        (err) => {
          console.log(err);
        }
      );
    }

}