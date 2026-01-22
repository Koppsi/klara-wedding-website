import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-countdown',
  imports: [CommonModule, TranslateModule],
  templateUrl: './countdown.html',
  styleUrl: './countdown.scss',
})
export class Countdown implements OnInit, OnDestroy{

  private weddingDate = new Date(2026, 8, 20, 14, 0, 0) // Bsp: 20. September 2026, 14 Uhr

  days = signal('00');
  hours = signal('00');
  minutes = signal('00');
  seconds = signal('00');

  private timerSubscription!: Subscription;

  ngOnInit(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.calculateTime();
    });
    this.calculateTime();
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  private calculateTime() {
    const now = new Date().getTime();
    const target = this.weddingDate.getTime();
    const diff = target - now;

    if (diff > 0) {
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      this.days.set(this.padZero(d));
      this.hours.set(this.padZero(h));
      this.minutes.set(this.padZero(m));
      this.seconds.set(this.padZero(s));
    } else {
      this.days.set('00');
      this.hours.set('00');
      this.minutes.set('00');
      this.seconds.set('00');
    }
  }

  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
