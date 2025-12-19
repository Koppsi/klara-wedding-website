import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LanguageSwitch {

  private currentLang: string;

  constructor(
    private router: Router, 
    @Inject(LOCALE_ID) locale: string
  ) {
    this.currentLang = locale;
  }

  public getTargetLanguage(): 'en' | 'de' {
    return this.currentLang === 'de' ? 'en' : 'de';
  }

  /**
   * Führt den tatsächlichen Sprachwechsel durch Weiterleitung aus.
   */
  public switchToTargetLanguage(): void {
      const targetLang = this.getTargetLanguage(); // Ziel: 'en'
      const currentPath = this.router.url;       // Aktuell: '/home'

      // 1. Basis-Pfad (Entferne den führenden Schrägstrich, falls vorhanden)
      // Wenn currentPath /home ist, wird basePath zu home.
      const basePath = currentPath.startsWith('/') 
          ? currentPath.substring(1) 
          : currentPath;
      
      // 2. Ziel-Pfad (mit neuem Sprachpräfix) erstellen
      // Ergebnis: /en/home
      const newPath = `/${targetLang}/${basePath}`; 
      
      console.log("Generierter neuer Pfad (Finaler Test-Pfad):", newPath);
      
      // Führe den Reload durch
      window.location.href = newPath;
  }
}
