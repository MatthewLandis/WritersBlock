import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  registerInfo = { username: '', email: '', password: '' };

  constructor(private http: HttpClient, private router: Router) { }

  signup() {
    this.http.post('http://localhost:4000/api/auth/register', this.registerInfo)
      .subscribe({
        next: () => {
          alert('Signup successful! You can now log in.');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error(error);
          alert('Signup failed. Username may already exist.');
        }
      });
  }
}
