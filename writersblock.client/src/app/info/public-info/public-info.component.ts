import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-public-info',
  standalone: false,
  templateUrl: './public-info.component.html',
  styleUrl: './public-info.component.css'
})
export class PublicInfoComponent implements OnInit {
  accountInformation = {
    username: '',
    email: '',
    password: '',
    displayName: 'placeholder'
  };

  private apiUrl = 'http://localhost:4000/api/auth/user/';
  private userId = localStorage.getItem('ID');

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const userId = localStorage.getItem('ID');
    this.loadUserInfo();
  }

  loadUserInfo() {
    if (!this.userId) return;

    this.http.get<{ username: string; email: string }>(this.apiUrl + this.userId)
      .subscribe({
        next: data => {
          this.accountInformation.username = data.username;
          this.accountInformation.email = data.email;
        },
        error: err => {
          console.error('Failed to load user info', err);
        }
      });
  }
}
