import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { TaskModel } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-input',
  templateUrl: './task.input.component.html'
})

export class TaskInputComponent implements OnInit, OnDestroy {
    taskForm: FormGroup;
    taskData: TaskModel;
    isIdHidden: boolean = true;
    private subForParam: any;
    constructor(private taskService: TaskService, private router : Router, private actRouter: ActivatedRoute) { }

    ngOnInit() {
      let taskId:string = '';
      this.subForParam = this.actRouter.params.subscribe(params => taskId = params['id']);
      this.setFormInputFields();
      if(taskId){
        this.getTaskDetail(taskId);
      }
    }

    getTaskDetail(taskId: string){
      this.taskService.getTask(taskId)
        .subscribe((task: any) => { 
            this.taskData = task; 
            this.taskData.id = task._id;
            this.setFormInputFields();
        });
    }

    setFormInputFields() : void{
      this.taskForm = new FormGroup({
            id: new FormControl(this.taskData ? this.taskData.id : null),
            description: new FormControl(this.taskData ? this.taskData.description : null, Validators.required)
        });
    }

    onSubmit(){
      if(this.taskForm.value){
        let task : TaskModel = {
          id : this.taskForm.value.id,
          description: this.taskForm.value.description
        }
        task.id ? this.updateTask(task) : this.addNewTask(task);
      }
    }

    addNewTask(task : TaskModel){
      this.taskService.addTask(task).subscribe(
        (result) => {
          if(result.ok){
            this.router.navigate(['/task'], { relativeTo: this.actRouter });
          }
        },
        (err) => {
          console.log(err);
        }
      )
    }

    updateTask(task : TaskModel){
      this.taskService.updateTask(task).subscribe(
        (result) => {
          if(result.ok){
            this.router.navigate(['/task'], { relativeTo: this.actRouter });
          }
        },
        (err) => {
          console.log(err);
        }
      )
    }

    cancelEdit(){
      this.router.navigate(['/task'], { relativeTo: this.actRouter });
    }

    ngOnDestroy() {
      this.subForParam.unsubscribe();
    }

}