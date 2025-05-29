import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

interface QuoteInstance {
  id: number;
  fullText: string;
  displayedText: string;
  isTyping: boolean;
  isDeleting: boolean;
  top: number;
  left: number;
  charIndex: number;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  showSplash = true;

  quotes = [
    '"A psychological inhibition preventing a writer from proceeding with a piece."',
    '"The condition of being unable to think of what to write or how to proceed with writing."',
    '"A creative slowdown typically affecting authors and artists."',
    '"The temporary or permanent loss of the ability to compose new work."',
    '"A condition where a writer finds themselves unable to write despite having the desire to do so."'
  ];

  activeQuotes: QuoteInstance[] = [];
  private quoteIdCounter = 0;
  private usedSlots: Set<number> = new Set();
  private maxSlots = 15;

  ngOnInit() {
    for (let i = 0; i < 15; i++) {
      this.spawnQuote();
    }
  }

  spawnQuote() {
    const quoteText = this.getRandomQuote();
    const id = this.quoteIdCounter++;

    const availableSlots = Array.from({ length: this.maxSlots }, (_, i) => i).filter(i => !this.usedSlots.has(i));
    const chosenSlot = availableSlots[Math.floor(Math.random() * availableSlots.length)];
    this.usedSlots.add(chosenSlot);

    const quote: QuoteInstance = {
      id,
      fullText: quoteText,
      displayedText: '',
      isTyping: true,
      isDeleting: false,
      top: chosenSlot * (100 / this.maxSlots),
      left: Math.random() * 80,
      charIndex: 0
    };

    this.activeQuotes.push(quote);
    this.animateQuote(quote, chosenSlot);
  }

  animateQuote(quote: QuoteInstance, slotIndex: number) {
    const typingSpeed = 50;
    const deletingSpeed = 30;
    const pauseBeforeDelete = 3000;

    const interval = setInterval(() => {
      if (quote.isTyping && !quote.isDeleting) {
        if (quote.charIndex < quote.fullText.length) {
          quote.displayedText += quote.fullText[quote.charIndex++];
        } else {
          quote.isTyping = false;
          setTimeout(() => {
            quote.isDeleting = true;
            quote.isTyping = true;
          }, pauseBeforeDelete);
        }
      } else if (quote.isDeleting) {
        if (quote.charIndex > 0) {
          quote.displayedText = quote.displayedText.slice(0, -1);
          quote.charIndex--;
        } else {
          clearInterval(interval);
          this.activeQuotes = this.activeQuotes.filter(q => q.id !== quote.id);
          this.usedSlots.delete(slotIndex);
          this.spawnQuote();
        }
      }
    }, quote.isDeleting ? deletingSpeed : typingSpeed);
  }

  getRandomQuote(): string {
    return this.quotes[Math.floor(Math.random() * this.quotes.length)];
  }

  handleHelpClick() {
    this.showSplash = false;
  }
}

