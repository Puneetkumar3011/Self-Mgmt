/* tslint:disable:no-unused-variable */
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from "@angular/router";
import { Subject, Observable } from 'rxjs';
import { ModalModule } from 'ngx-bootstrap';

import { TaskListComponent } from './task.list.component'; 
import { TaskService } from '../task.service';
import { TaskModel } from '../task.model';

describe('TaskListComponent', () => {     
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations:   [ TaskListComponent ],
        providers:      [
                            TaskService,
                            {provide: Router, useClass: MockRouter},
                            {provide: ActivatedRoute, useClass: MockActivatedRoute}
                        ],
        imports:        [ReactiveFormsModule, HttpModule, ModalModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create TaskListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('loadTaskList should load all tasks', () => {
    // Arrange
    let tasks: Array<TaskModel> = [
        { id: '1', description: 'Task1', createdOn: String(new Date()), taskStatus: 'Pending' },
        { id: '2', description: 'Task2', createdOn: String(new Date()), taskStatus: 'Completed' }
    ];
    
    // Act
    let taskSvc = fixture.debugElement.injector.get(TaskService);
    spyOn(taskSvc, 'getTasks').and.returnValue(Observable.from([ tasks ]));
    component.loadTaskList();

    //Assert
    expect(component.tasks).toBeDefined();
    expect(component.tasks.length).toBe(2);
    expect(component.tasks[0].id).toBe('1');
    expect(component.tasks[1].id).toBe('2');
  });

  it('editTask should redirect user to Input page', () => {
    // Arrange
    let task: any = {_id: '1', id: '1', description: 'Task1', createdOn: String(new Date()), taskStatus: 'Pending' };
    let router = TestBed.get(Router);
    let activateRouter = TestBed.get(ActivatedRoute);
    let navigateToInput = spyOn(router, 'navigate');
    
    // Act
    component.editTask(task);

    // Assert
    expect(navigateToInput).toHaveBeenCalled();
    expect(navigateToInput).toHaveBeenCalledWith(['input', task._id], { relativeTo: activateRouter });

  });

  // Mock Classes
    class MockRouter {
        navigate(params) { }
    }

    class MockActivatedRoute {
        private subject = new Subject();

        push(value){
            this.subject.next(value);
        }

        get params(){
            return this.subject.asObservable();
        }
    }
});
