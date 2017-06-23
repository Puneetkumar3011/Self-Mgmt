
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from "./error/error.component";
import { TaskComponent } from './task/task.component';
import { ExpenseComponent } from './expense/expense.component';
import { APP_TASK_ROUTES } from './task/task.routing';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'error', component: ErrorComponent },
    { path: 'task', component: TaskComponent, children: APP_TASK_ROUTES },
    { path: 'expense', component: ExpenseComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);