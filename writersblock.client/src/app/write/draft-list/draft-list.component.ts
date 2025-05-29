import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-draft-list',
  standalone: false,
  templateUrl: './draft-list.component.html',
  styleUrl: './draft-list.component.css'
})
export class DraftListComponent implements OnInit {

  drafts: string[] = [];

  ngOnInit(): void {
    this.loadDrafts();
  }

  loadDrafts() {
    this.drafts = JSON.parse(localStorage.getItem('drafts') || '[]');
  }
}
