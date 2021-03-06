import { IEmployee } from '../interface/IEmployee';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetEmployeeListService{

  private url="http://localhost:12345/api/employee";
  private employeeListURL = "assets/employees.json";

  constructor(private http: HttpClient){}

  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.url)
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getEmployee(emplID: number): Observable<IEmployee> {
    let params = new HttpParams();
    params = params.append('employeeId', emplID.toString());
    return this.http.get<IEmployee>(this.url, {params: params})
    .pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
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
