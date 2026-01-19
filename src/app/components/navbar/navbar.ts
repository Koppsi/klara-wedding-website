// import { Component } from '@angular/core';
// import { NavItemConfig } from '../../interfaces/ui-configs/nav-item-config.interface';
// import { CommonModule, NgClass } from '@angular/common';

// @Component({
//   selector: 'app-navbar',
//   imports: [NgClass, CommonModule],
//   templateUrl: './navbar.html',
//   styleUrl: './navbar.scss',
// })
// export class Navbar {

//   navItems: NavItemConfig[] = [
//     { name: 'Home', path: 'home', active: true },
//     { name: 'Details', path: 'details', active: false },
//     { name: 'RSVP', path: 'rsvp', active: false },
//     { name: 'Contact', path: 'contact', active: false },
//     { name: 'FAQS', path: 'faqs', icon: 'bi bi-arrow-right', active: false }
//   ]

//   selectedItem(nav: NavItemConfig) {
//     this.navItems.map((item: NavItemConfig) => {
//       item.active = nav.name === item.name
//     })
//   }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {}
