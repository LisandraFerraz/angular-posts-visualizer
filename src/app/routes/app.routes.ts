import { Routes } from '@angular/router';
import { HomeComponent } from 'app/pages/home/home.component';
import { PostDetailsComponent } from 'app/pages/post-details/post-details.component';
import { ProfileDetailsComponent } from 'app/pages/profile-details/profile-details.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'post/:id',
    component: PostDetailsComponent,
  },
  {
    path: 'profile/:id',
    component: ProfileDetailsComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: '**', component: HomeComponent },
];
