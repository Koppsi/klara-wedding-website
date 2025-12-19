import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Test } from './pages/test/test';

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
        path: 'test',
        component: Test
    }
];
