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
    this.currentLang = this.translate.currentLang || 'de';
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang = lang;
  }
}
