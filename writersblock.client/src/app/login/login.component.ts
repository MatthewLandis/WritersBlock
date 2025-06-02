import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  registerInfo = { username: '', password: '' };

  private apiUrl = 'http://localhost:4000/api/auth/login';

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    this.http.post<{ id: number, username: string }>(this.apiUrl, {
      username: this.registerInfo.username,
      password: this.registerInfo.password
    }).subscribe({
      next: (response) => {
        localStorage.setItem('ID', response.toString());
        localStorage.setItem('username', response.username);

        this.router.navigate(['/write']).then(() => {
          window.location.reload();
        });
      },
        error: (error) => {
          console.error(error);
          alert('Login failed. Please check your username or password.');
        }
      });
  }
}
