import {Component, enableProdMode} from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import {Platform, MenuController, ionicBootstrap} from 'ionic-angular';
import { AccountService } from './pages/start/account.service';
import { RequestService } from './services/request.service';
import { AppConfig } from './config';

import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {StartPage} from './pages/start/start';
enableProdMode();
@Component({
  //template: '<ion-nav [root]="rootPage"></ion-nav>'
  templateUrl: 'build/app.html',
  providers: [
    //ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    AccountService,
    RequestService,
    AppConfig
  ]
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform,
      private menu: MenuController) {
    //this.rootPage = TabsPage;
    this.rootPage = StartPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
