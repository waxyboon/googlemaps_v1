import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { Ionic2Rating } from 'ionic2-rating';

@Component({
  selector: 'page-review',
  templateUrl: 'rating.html'
})
export class Rating {

  rate: any;
  constructor(private storage: Storage, public navCtrl: NavController ) {}

  ionViewDidLoad() {
    console.log('Hello Review Page');
  }

  removeStored(){
    this.storage.remove('name');
    alert("Data Removed");
    this.navCtrl.setRoot(HomePage);
  }

  cancel(){
    this.navCtrl.pop();
  }
}
