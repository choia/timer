import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [ AppComponent ],
  entryComponents: [],
  imports: [ BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot() ],
  providers: [
    DatePipe,
    StatusBar,
    SplashScreen,
    LocalNotifications,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
