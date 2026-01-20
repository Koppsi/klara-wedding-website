import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Details } from './pages/details/details';
import { Rsvp } from './pages/rsvp/rsvp';
import { Contact } from './pages/contact/contact';
import { Faqs } from './pages/faqs/faqs';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'details', component: Details },
  { path: 'rsvp', component: Rsvp },
  { path: 'contact', component: Contact },
  { path: 'faqs', component: Faqs },

];