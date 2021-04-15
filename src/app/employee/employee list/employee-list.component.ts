import { Component, OnDestroy, OnInit } from '@angular/core';
import { IEmployee } from '../../interface/IEmployee';
import { Subscription } from "rxjs";
import { GetEmployeeListService } from '../../services/getEmployeeList.service';

@Component({
  templateUrl: './employee-list.component.html'
})

export class EmployeeListComponent implements OnInit, OnDestroy{

  constructor(private getEmployeeListService: GetEmployeeListService){}

  pageTitle: string = "Employee List";
  listFilter: string = '';
  errorMessage: string = '';
  sub!: Subscription;

  employeeDetails: IEmployee[] = [];

  ngOnInit(): void {
    this.sub = this.getEmployeeListService.getEmployees().subscribe({
      next: employees => {
        this.employeeDetails = employees;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
