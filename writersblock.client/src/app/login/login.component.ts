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

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    this.http.post('https://localhost:4000/api/auth/Login', this.registerInfo)
      .subscribe({
        next: () => {
          alert('Login successful!');
          this.router.navigate(['/write']);
        },
        error: (error) => {
          console.error(error);
          alert('Login failed. Please check your username or password.');
        }
      });
  }
}
