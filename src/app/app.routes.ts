import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Test } from './pages/test/test';
import { Details } from './pages/details/details';

export const routes: Routes = [{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
},
    {
        path: 'home',
        component: Home
    },
    {
        path: 'details',
        component: Details
    }
];
