import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { TaskService } from './task/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [TaskService]
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Self Management';
  routeSubscribe: Subscription;
  selectedModule: string = 'Overview';
  
  constructor(private router: Router){

  }

  ngOnInit(){
    this.routeSubscribe = this.router.events.subscribe((data: any) => {
      switch(data.url){
        case '/home': {
          this.selectedModule = 'Overview';
          break;
        }
        case '/task': {
          this.selectedModule = 'Task Management';
          break;
        }
        case '/expense': {
          this.selectedModule = 'Expense Management';
          break;
        }
        case '/error': {
          this.selectedModule = 'Error';
          break;
        }
        default: {
          //this.selectedModule = 'Overview';
          break;
        }
      }
    })
  }

  ngOnDestroy(){
    this.routeSubscribe.unsubscribe();
  }

}
