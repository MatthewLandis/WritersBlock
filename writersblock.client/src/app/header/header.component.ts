import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  username: string | null = '';
  dropdownOpen = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('ID');
    this.username = localStorage.getItem('username');
  }

  logout() {
    localStorage.removeItem('ID');
    localStorage.removeItem('USERNAME');
    this.isLoggedIn = false;
    this.username = null;
    this.dropdownOpen = false;
  }

  goHome() {
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
