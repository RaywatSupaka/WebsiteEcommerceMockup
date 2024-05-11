import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { API_URLS } from '../Interface/Api_URLS';

interface LoginObj {
  userName: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router,private http: HttpClient) {}

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }

  loginObject: LoginObj = {
    userName: '',
    password: '',
  };

  onLogin() {
    this.http.post(API_URLS.Local + API_URLS.Login, this.loginObject, {responseType: 'json',})
      .subscribe((res: any) => {
        if (res.result) {
          alert(res.message);
          localStorage.setItem('loginToken', res.data.token);
          this.router.navigateByUrl('/home');
        } else {
          alert(res.message);
        }
      });
  }

}
