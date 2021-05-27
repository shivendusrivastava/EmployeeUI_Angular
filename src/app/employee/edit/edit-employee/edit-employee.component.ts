import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IEmployee } from 'src/app/interface/IEmployee';
import { GetEmployeeListService } from 'src/app/services/getEmployeeList.service';
import { UpdateEmployeeService } from 'src/app/services/updateEmployee.service';

@Component({
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit, OnDestroy {

  constructor(
    private updateEmployeeService: UpdateEmployeeService,
    private getEmployeeService: GetEmployeeListService,
    private route: ActivatedRoute,
    private router: Router) { }

  sub!: Subscription;
  sub2!: Subscription;
  employee: IEmployee;
  errorMessage: string = '';

  ngOnInit(): void {
    const id = (this.route.snapshot.paramMap.get('employeeID')).toString();
    this.sub = this.getEmployeeService.getEmployees().subscribe({
      next: employees => {
        this.employee = employees.find(data => data.employeeID === id)
      },
      error: err => this.errorMessage = err
    });
  }

  onUpdate(employee: IEmployee) {
    this.sub2 = this.updateEmployeeService.updateEmployee(employee).subscribe(data => this.employee.employeeID = data.employeeID);
    this.router.navigate(["./employeelist"]);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

  onBack(): void{
    this.router.navigate(['./employeelist']);
  }
}
