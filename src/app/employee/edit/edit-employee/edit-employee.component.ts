import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IEmployee } from 'src/app/interface/IEmployee';
import { GetEmployeeListService } from 'src/app/services/getEmployeeList.service';

@Component({
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  constructor(private getEmployeeService: GetEmployeeListService, private route: ActivatedRoute, private router: Router) { }

  sub!: Subscription;
  employee: IEmployee;
  errorMessage: string = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('employeeID'));
    this.sub = this.getEmployeeService.getEmployees().subscribe({
      next: employees => {
        this.employee = employees.find(data => data.employeeID === id)
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onBack(): void{
    this.router.navigate(['./employeelist']);
  }
}
