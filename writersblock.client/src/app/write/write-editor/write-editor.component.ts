import { Component, OnInit } from '@angular/core';
import { AiHelperService } from '../ai-helper.service';

@Component({
  selector: 'app-write-editor',
  standalone: false,
  templateUrl: './write-editor.component.html',
  styleUrl: './write-editor.component.css'
})
export class WriteEditorComponent implements OnInit {
  draftContent: string = '';
  enhancedContent: string = '';
  wordCount: number = 0;
  charCount: number = 0;
  darkMode: boolean = false;
  currentPrompt: string = '';

  autoSaveInterval: any;

  prompts: string[] = [
    "Describe a perfect day in a dystopian world.",
    "Your character wakes up with no memory of the past year.",
    "A letter arrives with no return address.",
    "Write about a conversation between two rival spies.",
    "Describe a mysterious door that appears overnight."
  ];

  constructor(private aiHelper: AiHelperService) { }

  ngOnInit(): void {
    this.loadDraft();
    this.updateCounts();

    // Auto-save every 5 seconds
    this.autoSaveInterval = setInterval(() => {
      this.autoSave();
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.autoSaveInterval);
  }

  saveDraft() {
    const drafts = JSON.parse(localStorage.getItem('drafts') || '[]');
    drafts.push(this.draftContent);
    localStorage.setItem('drafts', JSON.stringify(drafts));
    alert('Draft saved!');
    this.draftContent = '';
    this.updateCounts();
  }

  enhanceDraft() {
    if (!this.draftContent.trim()) {
      this.enhancedContent = 'Please write something first!';
    } else {
      this.enhancedContent = this.aiHelper.enhanceText(this.draftContent);
    }
  }

  updateCounts() {
    this.wordCount = this.draftContent.trim().split(/\s+/).filter(word => word).length;
    this.charCount = this.draftContent.length;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

  getPrompt() {
    const randomIndex = Math.floor(Math.random() * this.prompts.length);
    this.currentPrompt = this.prompts[randomIndex];
  }

  autoSave() {
    localStorage.setItem('autosaveDraft', this.draftContent);
  }

  loadDraft() {
    const saved = localStorage.getItem('autosaveDraft');
    if (saved) {
      this.draftContent = saved;
    }
  }
}
