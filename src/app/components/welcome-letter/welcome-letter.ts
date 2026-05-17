import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-letter',
  imports: [],
  templateUrl: './welcome-letter.html',
  styleUrl: './welcome-letter.scss',
})
export class WelcomeLetter implements OnInit {
  isOpen = false;
  isHidden = false;

  ngOnInit() {
    // Prüft, ob der Gast den Brief in der Vergangenheit schon mal geöffnet hat
    const alreadyOpened = localStorage.getItem('letterOpened');
    
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
      
      // Speichert die Info DAUERHAFT im Browser des Gastes ab
      localStorage.setItem('letterOpened', 'true'); 
      
      document.body.style.overflow = 'auto'; // Scrollen wieder erlauben
    }, 3000); 
  }
}