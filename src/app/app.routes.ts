import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./home/home').then(m => m.Home) },
    { path: 'login', loadComponent: () => import('./login/login').then(m => m.Login) },
    {path:'photos/:id', loadComponent: () => import('./photos/photos').then(m => m.Photos) },
];
