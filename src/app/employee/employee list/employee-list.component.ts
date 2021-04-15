import { Component, OnDestroy, OnInit } from '@angular/core';
import { IEmployee } from '../../interface/IEmployee';
import { Subscription } from "rxjs";
import { GetEmployeeListService } from '../../services/getEmployeeList.service';

@Component({
  templateUrl: './employee-list.component.html'
})

export class EmployeeListComponent implements OnInit, OnDestroy{

  constructor(private getEmployeeListService: GetEmployeeListService){}

  private _listFilter: string = '';

  pageTitle: string = "Employee List";

  errorMessage: string = '';
  sub!: Subscription;

  employeeDetails: IEmployee[] = [];

  filteredEmployees: IEmployee[] = this.employeeDetails;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredEmployees = this.performFilter(value);
  }

  performFilter(filterValue: string): IEmployee[] {
    filterValue = filterValue.toLocaleLowerCase();
    return this.employeeDetails.filter(
      (emp: IEmployee) => emp.firstName.toLocaleLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    this.sub = this.getEmployeeListService.getEmployees().subscribe({
      next: employees => {
        this.employeeDetails = employees;
        this.filteredEmployees = this.employeeDetails;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
