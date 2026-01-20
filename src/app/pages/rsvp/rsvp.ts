import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-rsvp',
  imports: [CommonModule, TranslateModule],
  templateUrl: './rsvp.html',
  styleUrl: './rsvp.scss',
})
export class Rsvp {

  scrollToForm() {
    // Falls du das Formular später unten auf der Seite einbaust:
    const element = document.getElementById('rsvpFormSection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log('Hier würde sich das Formular öffnen');
    }
  }
}
