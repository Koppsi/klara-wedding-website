import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, TranslateModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  currentLang: string = 'de';

  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('selectedLanguage');
    this.currentLang = savedLang || this.translate.currentLang || 'de';
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
    
    // Speichert die ausgewählte Sprache DAUERHAFT im Browser
    localStorage.setItem('selectedLanguage', lang);
  }

  closeMenu() {
    const navbarCollapse = document.getElementById('navbarNav');
    
    // Prüfen, ob das Menü aktuell offen ist (Klasse 'show' ist vorhanden)
    if (navbarCollapse?.classList.contains('show')) {
      
      // Wir suchen den Hamburger-Button...
      const toggler = document.querySelector('.navbar-toggler') as HTMLElement;
      
      // ... und "klicken" ihn programmatisch per Code!
      if (toggler) {
        toggler.click();
      }
    }
  }
}
