import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { WelcomeLetter } from "./components/welcome-letter/welcome-letter";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, WelcomeLetter],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('klara-wedding-website');
}
