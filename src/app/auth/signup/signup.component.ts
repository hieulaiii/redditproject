import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { SignuprrequestPayload } from './signup-request.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupRequestPayload: SignuprrequestPayload | any
  public signupForm: FormGroup | any

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService){
    this.signupRequestPayload = {
      username: '',
      email: '',
      password: ''
    }
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  signup(){
    this.signupRequestPayload.email = this.signupForm.get('email').value
    this.signupRequestPayload.username = this.signupForm.get('username').value
    this.signupRequestPayload.password = this.signupForm.get('password').value

    this.authService.signup(this.signupRequestPayload)
    .subscribe(() => {
      this.toastr.success('Sign up successfully!')
      this.router.navigate(['/login'],
      { queryParams: { register: 'true' }})
    }, () => {
      this.toastr.error('Registration Failed! Please try again')
    })
  }
}
