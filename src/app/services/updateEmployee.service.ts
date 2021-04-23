import { IEmployee } from '../interface/IEmployee';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap, filter } from 'rxjs/operators';
import { GetEmployeeListService } from './getEmployeeList.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateEmployeeService{

  //url="http://localhost:12345/api/employee";
  private employeeListURL = "assets/employees.json";
  employeeDetails: IEmployee[] = [];
  sub: any;

  constructor(private http: HttpClient, private getEmployeeListService: GetEmployeeListService){}

  updateEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.get<IEmployee>(this.employeeListURL)
    .pipe(
      map(epics => epics.filter(epic => epic.employeeID === employee.employeeID)[0]),
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError))
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
