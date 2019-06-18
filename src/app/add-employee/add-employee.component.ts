import { Component, OnInit } from '@angular/core';
import { HttpClientService, Employee } from '../service/http-client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employeeForm: FormGroup;

  employee: Employee;

  errtext: string;

  constructor(private httpClientService: HttpClientService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      empName: ['', Validators.required],
      empId: ['', Validators.required]
    });
  }

  onSubmit() {
    this.employee = new Employee(this.employeeForm.get("empId").value,this.employeeForm.get("empName").value);
    console.log("Form submitted: " + this.employee.empId + ", " + this.employee.empName);
    this.httpClientService.createEmployee(this.employee)
      .subscribe(data => this.errtext = 'Employee added successfully',
                 error => {
                   if(error["status"] == 500) this.errtext = 'Employee Already exists';
                   else this.errtext = 'Please Check Your Connectivity';
                 }
      );  
    this.employeeForm.reset();
  }
  
}
