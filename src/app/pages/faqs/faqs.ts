import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { WeddingGame } from '../../components/wedding-game/wedding-game';

@Component({
  selector: 'app-faqs',
  imports: [CommonModule, TranslateModule, WeddingGame],
  templateUrl: './faqs.html',
  styleUrl: './faqs.scss',
})
export class Faqs {
  faqItems = [
    { question: 'FAQS.Q_RSVP_DEADLINE', answer: 'FAQS.A_RSVP_DEADLINE', isOpen: false },
    { question: 'FAQS.Q_DRESSCODE', answer: 'FAQS.A_DRESSCODE', isOpen: false },
    { question: 'FAQS.Q_PLUS_ONE', answer: 'FAQS.A_PLUS_ONE', isOpen: false },
    { question: 'FAQS.Q_KIDS', answer: 'FAQS.A_KIDS', isOpen: false },
    { question: 'FAQS.Q_GIFTS', answer: 'FAQS.A_GIFTS', isOpen: false },
    { question: 'FAQS.Q_TRANSPORT', answer: 'FAQS.A_TRANSPORT', isOpen: false },
  ];

  toggleFaq(index: number) {
    // Option A: Immer nur EINE Frage gleichzeitig offen (Akkordeon-Effekt)
    // this.faqItems.forEach((item, i) => {
    //   if (i !== index) item.isOpen = false;
    // });

    // Option B: Mehrere gleichzeitig offen (einfacher Toggle) -> Wir nehmen das hier
    this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
  }

  showGame = false;

  openGameModal() {
    this.showGame = true;
    // Optional: Scrollen der Hauptseite verhindern, während Modal offen ist
    document.body.style.overflow = 'hidden';
  }

  closeGameModal() {
    this.showGame = false;
    document.body.style.overflow = 'auto';
  }
}
