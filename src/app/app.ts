import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import * as AOS from 'aos';
import { WelcomeLetter } from "./components/welcome-letter/welcome-letter";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, WelcomeLetter],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  protected readonly title = signal('klara-wedding-website');

  ngOnInit(): void {
    AOS.init({
      duration: 800, // Dauer in ms
      once: true,    // Nur einmal animieren beim Runterscrollen
      easing: 'ease-out'
    });
  }

}
