import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export class Employee{
  constructor(
    public empId:string,
    public empName:string,
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient) { 
  }

  getEmployees() {
    console.log("test call");
    return this.httpClient.get<Employee[]>('https://aa63dc4e.ngrok.io/employees');
  }

  public deleteEmployee(employee) {
    return this.httpClient.delete<Employee>("https://aa63dc4e.ngrok.io/employees" + "/"+ employee.empId);
  }

  public createEmployee(employee) {
    return this.httpClient.post<Employee>("https://aa63dc4e.ngrok.io/employees", employee);
  }
}