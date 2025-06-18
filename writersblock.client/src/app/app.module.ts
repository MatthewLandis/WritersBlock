import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { WriteComponent } from './write/write.component';
import { LoginRegisterComponent } from './login-register/login-register.component';

import { InfoComponent } from './info/info.component';
import { PublicInfoComponent } from './info/public-info/public-info.component';
import { PrivateInfoComponent } from './info/private-info/private-info.component';
import { AnalyticsComponent } from './info//analytics/analytics.component';
import { SettingsComponent } from './info/settings/settings.component';
import { AchievementsComponent } from './info/achievements/achievements.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TipsComponent } from './tips/tips.component';
import { PostComponent } from './post/post.component';
import { LibraryComponent } from './library/library.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    WriteComponent,
    LoginRegisterComponent,
    InfoComponent,
    PublicInfoComponent,
    PrivateInfoComponent,
    AnalyticsComponent,
    AchievementsComponent,
    SettingsComponent,
    TipsComponent,
    PostComponent,
    LibraryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
