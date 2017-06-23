import { TaskInputComponent } from './task.input.component';
import { ReactiveFormsModule } from '@angular/forms'
import { Router, ActivatedRoute, RouterOutlet, RouterModule  } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Subscriber, Observable, Subject } from 'rxjs';

import { TaskService } from '../task.service';
import { TaskModel } from '../task.model';

describe('TaskComponent', () => {
  let component: TaskInputComponent;
  let fixture: ComponentFixture<TaskInputComponent>;
  let taskStub : TaskModel = {
          id: '1',
          createdOn: String(new Date()),
          description: 'New Task',
          taskStatus: 'Pending'
      };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations:   [ TaskInputComponent ],
        providers:      [
                            TaskService,
                            {provide: Router, useClass: MockRouter},
                            {provide: ActivatedRoute, useClass: MockActivatedRoute}
                        ],
        imports:        [ReactiveFormsModule, HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create TaskInputComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should load screen in Create mode when no parameter passed', () => {
    expect(component.taskData).toBeUndefined();
  });

  it('should load screen in Edit mode when parameter Id passed', () => {
    let taskSvc = fixture.debugElement.injector.get(TaskService);
    let route : MockActivatedRoute = TestBed.get(ActivatedRoute);
    spyOn(taskSvc, 'getTask').and.returnValue(Observable.from([ taskStub ]));
    route.push({id: 1});
    expect(component.taskData).toBeDefined();
    expect(component.taskData.description).toBe('New Task');
  });

  it('Should add new task', () => {
      let router: MockRouter = TestBed.get(Router);
      let activatedRt: MockActivatedRoute = TestBed.get(ActivatedRoute);
      let taskSvc = TestBed.get(TaskService);
      let routeToTask = spyOn(router, 'navigate');
      let response : any = { ok: true };
      spyOn(taskSvc, 'addTask').and.returnValue(Observable.from([response]));
      component.addNewTask(taskStub);
 
      expect(routeToTask).toHaveBeenCalled();
      expect(routeToTask).toHaveBeenCalledWith(['/task'], { relativeTo: activatedRt });
  });

  it('Should update existing task', () => {
      let router: MockRouter = TestBed.get(Router);
      let activatedRt: MockActivatedRoute = TestBed.get(ActivatedRoute);
      let taskSvc = TestBed.get(TaskService);
      let routeToTask = spyOn(router, 'navigate');
      let response : any = { ok: true };
      spyOn(taskSvc, 'updateTask').and.returnValue(Observable.from([response]));
      component.updateTask(taskStub);
 
      expect(routeToTask).toHaveBeenCalled();
      expect(routeToTask).toHaveBeenCalledWith(['/task'], { relativeTo: activatedRt });
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