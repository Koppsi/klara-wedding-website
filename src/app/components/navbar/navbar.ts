import { Component } from '@angular/core';
import { NavItemConfig } from '../../interfaces/ui-configs/nav-item-config.interface';
import { CommonModule, NgClass } from '@angular/common';
import { LanguageSwitch } from '../../services/language-switch';

@Component({
  selector: 'app-navbar',
  imports: [NgClass, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

  public currentLanguage: string; 
  public targetLanguage: string;

  navItems: NavItemConfig[] = [
    { name: 'Home', path: 'home', active: true },
    { name: 'Details', path: 'details', active: false },
    { name: 'RSVP', path: 'rsvp', active: false },
    { name: 'Contact', path: 'contact', active: false },
    { name: 'FAQS', path: 'faqs', icon: 'bi bi-arrow-right', active: false }
  ]

  constructor(private langService: LanguageSwitch) {
      // Initialisiere die Button-Texte
      // Wir holen die Sprachen aus dem Service, um sie im Template anzuzeigen
      this.currentLanguage = (this.langService as any).currentLang.toUpperCase();
      this.targetLanguage = this.langService.getTargetLanguage().toUpperCase();
  }

  selectedItem(nav: NavItemConfig) {
    this.navItems.map((item: NavItemConfig) => {
      item.active = nav.name === item.name
    })
  }

  changeLanguage(): void {
      this.langService.switchToTargetLanguage();
  }
}
