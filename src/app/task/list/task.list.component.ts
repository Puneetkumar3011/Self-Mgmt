import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { TaskModel } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task.list.component.html'
})

export class TaskListComponent implements OnInit {
    tasks: Array<TaskModel> = [];
    @ViewChild('deleteModal') public deleteModal:ModalDirective;
    taskToDelete: TaskModel;
    delMsg: string;
    @ViewChild('completeModal') public completeModal:ModalDirective;
    taskToComplete: TaskModel;
    completeMsg: string;

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

    deleteTask(): void{
      this.taskService.deleteTask(this.taskToDelete).subscribe(
        (res) => {
          this.loadTaskList();
          this.deleteModal.hide();
          console.log('Deleted');
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.deleteModal.hide();
        }
      );
    }

    updateTask(){
      this.taskToComplete.taskStatus = 'Completed';
      this.taskService.updateTask(this.taskToComplete).subscribe(
        (result) => {
          if(result.ok){
            this.router.navigate(['/task'], { relativeTo: this.actRouter });
          }
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.completeModal.hide();
        }
      )
    }

    public showDeleteModal(task: TaskModel):void {
      this.delMsg = "Are you sure to delete " + "'" + task.description + "'" + " from the task list?";
      this.taskToDelete = task;
      this.deleteModal.show();
    }

    public showCompleteModal(task: TaskModel):void {
      this.completeMsg = "Are you sure to mark " + "'" + task.description + "'" + " as completed?";
      this.taskToComplete = task;
      this.completeModal.show();
    }

}