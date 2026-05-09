import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-letter',
  imports: [],
  templateUrl: './welcome-letter.html',
  styleUrl: './welcome-letter.scss',
})
export class WelcomeLetter {
  isOpen = false;
  isHidden = false;

  ngOnInit() {
    const alreadyOpened = sessionStorage.getItem('letterOpened');
    if (alreadyOpened) {
      this.isHidden = true;
    }
    
    if (!this.isHidden) {
      document.body.style.overflow = 'hidden';
    }
  }

  openLetter() {
    if (this.isOpen) return; // Verhindert doppeltes Klicken

    this.isOpen = true; // Startet die 3D-Animation

    // Nach 3 Sekunden (wenn alle Animationen fertig sind) ausblenden
    setTimeout(() => {
      this.isHidden = true;
      // sessionStorage.setItem('letterOpened', 'true'); // Für den nächsten Seitenwechsel merken
      document.body.style.overflow = 'auto'; // Scrollen wieder erlauben
    }, 3000); 
  }
}
