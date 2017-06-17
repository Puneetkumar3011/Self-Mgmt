import { Component } from '@angular/core';

import { TaskService } from './task/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [TaskService]
})
export class AppComponent {
  title = 'Self Management';
  selectedModule: string = 'Overview';
  
  changedModule(selModule: string){
    this.selectedModule = selModule;
  }
}
