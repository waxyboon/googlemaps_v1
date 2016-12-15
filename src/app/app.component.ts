import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Maps } from '../pages/maps/maps';
import { HomePage } from '../pages/home/home';
//import { SearchAutocomplete } from '../pages/search-autocomplete/search-autocomplete';
import { Driverdetails } from '../pages/driverdetails/driverdetails';
//import { Passengerresult } from '../pages/passengerresult/passengerresult';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
  //providers: [SaveService]
})
export class MyApp {
  rootPage = HomePage;
  //rootPage = Driverdetails;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      //Splashscreen.hide();
    });
  }
}
