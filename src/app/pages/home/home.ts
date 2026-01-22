import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FadeIn } from '../../directives/fade-in';
import { Countdown } from '../../components/countdown/countdown';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, TranslateModule, FadeIn, Countdown],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
