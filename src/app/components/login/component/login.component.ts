import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  // @ts-ignore
  loginForm: FormGroup;
  hide = true;
  loginFailWrongCredentials = false;
  matcher = new MyErrorStateMatcher();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    if(this.authService.isLoggedIn())
      this.router.navigate(['/orders']).then(() => {});

    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('',[Validators.required, Validators.pattern(/^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^!&*+=]).*$/gm)])
    });

  }

  login(): void {

      const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;

    if (this.authService.login(email, password)) {
      this.loginFailWrongCredentials = false;
      this.router.navigate(['/orders']);
      this.reloadPage();
    } else {
      this.loginFailWrongCredentials = true;
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
