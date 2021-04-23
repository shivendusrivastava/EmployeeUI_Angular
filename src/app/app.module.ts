import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EditEmployeeComponent } from './employee/edit/edit-employee/edit-employee.component';
import { EmployeeListComponent } from './employee/employee list/employee-list.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    EmployeeListComponent,
    EditEmployeeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'employeelist', component: EmployeeListComponent },
      { path: 'employeelist/:employeeID', component: EditEmployeeComponent },
      { path: 'welcome', component: WelcomePageComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
  ])
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
