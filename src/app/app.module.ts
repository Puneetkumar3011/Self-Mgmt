import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule, ModalModule, CarouselModule, TabsModule } from 'ngx-bootstrap';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { HomeComponent } from './home/home.component';
import { ExpenseComponent } from './expense/expense.component';
import { TaskInputComponent } from './task/input/task.input.component';
import { TaskListComponent } from './task/list/task.list.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    HomeComponent,
    ExpenseComponent,
    TaskInputComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
