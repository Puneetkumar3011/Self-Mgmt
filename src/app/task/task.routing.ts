import { Routes, RouterModule } from "@angular/router";

import { TaskInputComponent } from './input/task.input.component';
import { TaskListComponent } from './list/task.list.component';

export const APP_TASK_ROUTES: Routes = [
    { path: '', component: TaskListComponent },
    { path: 'list', component: TaskListComponent },
    { path: 'input', component: TaskInputComponent },
    { path: 'input/:id', component: TaskInputComponent }
];