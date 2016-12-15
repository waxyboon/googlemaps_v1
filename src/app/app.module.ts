import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Maps } from '../pages/maps/maps';
import { SearchAutocomplete } from '../pages/search-autocomplete/search-autocomplete';
import { Passengerdetails } from '../pages/passengerdetails/passengerdetails';
import { Passengerresult } from '../pages/passengerresult/passengerresult';
import { Driverdetails } from '../pages/driverdetails/driverdetails';
import { Rating } from '../pages/rating/rating';
import { Sort } from '../pipes/sort';
import { SafePipe } from '../pipes/safe';
import { Storage } from '@ionic/storage';
//import { Ionic2RatingModule } from 'ionic2-rating/module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Maps,
    SearchAutocomplete,
    Passengerdetails,
    Passengerresult,
    Driverdetails,
    Rating,
    Sort,
    SafePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    //Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Maps,
    SearchAutocomplete,
    Passengerdetails,
    Passengerresult, 
    Driverdetails,
    Rating
  ],
  providers: [
    Storage
  ]
})
export class AppModule { }
