import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  accountInformation = {
    username: '',
    email: '',
    password: ''
  };

  private apiUrl = 'http://localhost:4000/api/auth/user';
  private userId = localStorage.getItem('ID');

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const userId = localStorage.getItem('ID');
    //this.loadUserInfo();
    alert(userId);
  }

  //loadUserInfo() {
  //  if (!this.userId) return;

  //  this.http.get<{ username: string; email: string }>(`${this.apiUrl}/${this.userId}`)
  //    .subscribe({
  //      next: data => {

  //      },
  //      error: err => {
  //        console.error('Failed to load user info', err);
  //      }
  //    });
  //}
}
