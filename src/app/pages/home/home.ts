import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FadeIn } from '../../directives/fade-in';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, TranslateModule, FadeIn],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
