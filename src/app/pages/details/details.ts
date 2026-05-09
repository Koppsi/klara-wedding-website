import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FadeIn } from '../../directives/fade-in';

@Component({
  selector: 'app-details',
  imports: [CommonModule, TranslateModule],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {

}
