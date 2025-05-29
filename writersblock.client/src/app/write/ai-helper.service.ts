import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AiHelperService {

  constructor() { }

  enhanceText(text: string): string {
    if (!text) return 'Please write something first!';
    // Simulate AI magic
    return `✨ Improved Draft: "${text.trim().charAt(0).toUpperCase() + text.trim().slice(1)}." (AI polished)`;
  }
}
