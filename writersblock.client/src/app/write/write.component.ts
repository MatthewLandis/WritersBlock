import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-write',
  standalone: false,
  templateUrl: './write.component.html',
  styleUrl: './write.component.css'
})
export class WriteComponent implements OnInit {
  draftText: string = '';
  draftName: string = '';
  saveMessage: string = '';
  savedDrafts: { timestamp: string, content: string, name?: string }[] = [];
  editingTimestamp: string | null = null;

  ngOnInit() {
    this.loadDrafts();
  }

  saveDraft() {
    const userId = 'user123'; // Replace with actual user auth
    const timestamp = this.editingTimestamp || new Date().toISOString();
    const draftKey = `draft-${userId}-${timestamp}`;

    const draftData = JSON.stringify({
      content: this.draftText,
      name: this.draftName,
      timestamp
    });

    localStorage.setItem(draftKey, draftData);
    this.saveMessage = this.editingTimestamp ? 'Draft updated!' : 'Draft saved!';
    this.draftText = '';
    this.draftName = '';
    this.editingTimestamp = null;
    this.loadDrafts();
  }

  loadDrafts() {
    const userId = 'user123';
    this.savedDrafts = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(`draft-${userId}-`)) {
        const raw = localStorage.getItem(key);
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            this.savedDrafts.push(parsed);
          } catch {
            // Skip invalid entries
          }
        }
      }
    }

    this.savedDrafts.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  }

  editDraft(draft: { timestamp: string, content: string, name?: string }) {
    this.draftText = draft.content;
    this.draftName = draft.name || '';
    this.editingTimestamp = draft.timestamp;
    this.saveMessage = '';
  }

  deleteDraft(draft: { timestamp: string }) {
    const userId = 'user123';
    const key = `draft-${userId}-${draft.timestamp}`;
    localStorage.removeItem(key);
    this.loadDrafts();
  }
}
