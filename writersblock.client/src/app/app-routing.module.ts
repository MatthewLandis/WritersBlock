import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WriteComponent } from './write/write.component';
import { HomeComponent } from './home/home.component';
import { LoginRegisterComponent } from './login-register/login-register.component';

import { InfoComponent } from './info/info.component';
import { PublicInfoComponent } from './info/public-info/public-info.component';
import { PrivateInfoComponent } from './info/private-info/private-info.component';
import { AnalyticsComponent } from './info/analytics/analytics.component';
import { AchievementsComponent } from './info/achievements/achievements.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'write', component: WriteComponent },
  { path: 'login-register', component: LoginRegisterComponent },


  { path: 'info', component: InfoComponent },
  { path: 'public-info', component: PublicInfoComponent },
  { path: 'private-info', component: PrivateInfoComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'achievements', component: AchievementsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
