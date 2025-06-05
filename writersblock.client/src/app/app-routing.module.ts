import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WriteComponent } from './write/write.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SettingsComponent } from './settings/settings.component';

import { InfoComponent } from './info/info.component';
import { PublicInfoComponent } from './info/public-info/public-info.component';
import { PrivateInfoComponent } from './info/private-info/private-info.component';
import { AnalyticsComponent } from './analytics/analytics.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'write', component: WriteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'settings', component: SettingsComponent },

  { path: 'info', component: InfoComponent },
  { path: 'public-info', component: PublicInfoComponent },
  { path: 'private-info', component: PrivateInfoComponent },
  { path: 'analytics', component: AnalyticsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
