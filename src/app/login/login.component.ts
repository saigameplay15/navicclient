import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  errtext: string;

  constructor(private formBuilder: FormBuilder, private loginService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  onSubmit() {
    if (this.loginService.authenticate(this.loginForm.get('username').value,this.loginForm.get('password').value)) {
      this.router.navigate(['employees']);
    } else {
      this.errtext = "Invalid Login Attempt";
    }
  }
}
