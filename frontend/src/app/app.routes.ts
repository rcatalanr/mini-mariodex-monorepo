import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./components/mariodex-page-component/mariodex-page-component').then(c => c.MariodexPageComponent) },

];
