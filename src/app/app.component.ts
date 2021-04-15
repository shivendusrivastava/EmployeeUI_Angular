import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  template: `
  <nav class='navbar navbar-expand navbar-light bg-light'>
    <a class='navbar-brand'>{{pageTitle}}</a>
    <ul class='nav nav-pills'>
      <li><a class='nav nav-link' routerLink='/welcome'>Home</a>
      <li><a class='nav nav-link' routerLink='/employeelist'>Employee List</a>
    </ul>
  </nav>
  <div class='container'>
    <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent {
  pageTitle: string = 'Employee Management System';
}
