import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule, ModalModule, CarouselModule, TabsModule, DatepickerModule, ButtonsModule } from 'ngx-bootstrap';

import { GlobalErrorHandler } from "./app.globalerrorhandler";
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { HomeComponent } from './home/home.component';
import { ExpenseComponent } from './expense/expense.component';
import { TaskInputComponent } from './task/input/task.input.component';
import { TaskListComponent } from './task/list/task.list.component';
import { ErrorComponent } from './error/error.component';
import { LogService } from './log.service';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    HomeComponent,
    ExpenseComponent,
    TaskInputComponent,
    TaskListComponent,
    ErrorComponent
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
    TabsModule.forRoot(),
    DatepickerModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [
    LogService,
    {
      provide: ErrorHandler, 
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
