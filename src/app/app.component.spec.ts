/* tslint:disable:no-unused-variable */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute , RouterOutlet} from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing'
import { Subject, Observable } from 'rxjs';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TaskService } from './task/task.service';

xdescribe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations:   [ AppComponent ],
        providers:      [
                            {provide: Router, useClass: MockRouter}
                        ],
        imports:        [RouterTestingModule.withRoutes([]), HttpModule],
        schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

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
