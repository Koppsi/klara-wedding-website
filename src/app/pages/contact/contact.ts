import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FadeIn } from '../../directives/fade-in';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, TranslateModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {

}
