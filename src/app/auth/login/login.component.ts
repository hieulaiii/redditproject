import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { LoginRequestPayload } from './login-request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup | any
  public loginRequestPayload: LoginRequestPayload
  public isError: boolean | any
  public registerSuccessMessage: string = ''

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService
    ) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    }

    this.activatedRoute.queryParams.subscribe(params => {
      if(params['registered'] !== undefined && params['registered'] === 'true'){
        this.toastr.success('Signup Successful');
        // this.registerSuccessMessage = 'Please check your inbox  for activate' + 'activate your account before Login!';
      }
    })
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  login(){
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginRequestPayload).subscribe(data => {
      console.log('successfully');

      if(data){
        this.isError = false;
        this.router.navigateByUrl('');
        this.toastr.success('Login Successful');
      } else {
        this.isError = true;
        this.registerSuccessMessage = 'Login failed';
      }

    }, () => {
      this.toastr.error('Login Failed, Please try again')
    })
  }
}
