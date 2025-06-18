import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  standalone: false,
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent {
  loginInfo = { username: '', password: '' };
  registerInfo = { username: '', password: '', email: '' };

  loginOrRegister = true;

  constructor(private http: HttpClient, private router: Router) { }

  switchAction() {
    this.loginOrRegister = !this.loginOrRegister;
  }

  login() {
    this.http.post<{ id: number, username: string }>('http://localhost:4000/api/auth/login', {
      username: this.loginInfo.username,
      password: this.loginInfo.password
    }).subscribe({
      next: (response) => {
        localStorage.setItem('ID', response.id.toString());
        localStorage.setItem('username', response.username);

        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      },
        error: (error) => {
          console.error(error);
          alert('Login failed. Please check your username or password.');
        }
      });
  }

  register() {
    this.http.post('http://localhost:4000/api/auth/register', this.registerInfo)
      .subscribe({
        next: () => {
          alert('Signup successful! You can now log in.');
          window.location.reload();
        },
        error: (error) => {
          console.error(error);
          alert('Signup failed. Username may already exist.');
        }
      });
  }
}
