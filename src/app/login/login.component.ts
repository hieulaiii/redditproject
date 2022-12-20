import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  public username=''
  public password=''
  public errorMsg = ''

  constructor(private auth: AuthService, private router: Router){}

  ngOnInit(): void {

  }

  public login(){
    if(this.username.trim().length === 0){
      this.errorMsg = 'Username is required!'
    } else if(this.password.trim().length === 0){
      this.errorMsg = 'Please fill password'
    } else{
      this.errorMsg = ''
      let res = this.auth.login(this.username, this.password)
      if(res == 200){
        this.router.navigate(['home'])
      }
      if(res == 403){
        this.errorMsg = 'Invalid Credentials'
      }
    }


  }

}
