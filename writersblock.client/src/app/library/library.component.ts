import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library',
  standalone: false,
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent {
  author = '';
  selectedGenere = '';
  generes = [ 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Horror', 'Adventure', 'Satire' ];
  title = '';
  story = '';

  loginOrRegister = true;

  constructor(private http: HttpClient, private router: Router) { }


  
}
