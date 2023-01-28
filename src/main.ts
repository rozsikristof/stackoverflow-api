import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: 'search',
    loadComponent: () => import('./app/pages/search-page/search-page.component').then(c => c.SearchPageComponent)
  },
  {
    path: 'user-info',
    loadComponent: () => import('./app/pages/user-info-page/user-info-page.component').then(c => c.UserInfoPageComponent)
  }
];

bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes)
    ]
  }
).catch(err => console.error(err));
