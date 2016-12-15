import { Component } from '@angular/core';
import { Passengerdetails } from '../passengerdetails/passengerdetails';
import { Maps } from '../maps/maps';
import { NavController, NavParams } from 'ionic-angular';
import { Passengerresult } from '../passengerresult/passengerresult';
import { Storage } from '@ionic/storage';
//import { SaveService } from 'service.ts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

  //providers: [SaveService]
})
export class HomePage {
  address: string;
  curr_addr: any;
  mark_coordinate: any;
  add_to_pass: any;
  storedaddr: any;
  haveRide: any;

  constructor(public storage: Storage, public navCtrl: NavController, private navParams: NavParams) {
    this.curr_addr = navParams.get('address_name');
    this.mark_coordinate = navParams.get('coordinate');
    //alert("cur add" + this.curr_addr);
    //alert("mark" + this.mark_coordinate);

    // if (typeof this.mark_coordinate != undefined && this.mark_coordinate) {

    //if (typeof this.curr_addr != undefined && this.curr_addr) {
    //alert("inner " + this.address);
    this.address = this.curr_addr;
    //this.add_to_pass = this.curr_addr;

    // } //else {
    //alert("enter else");
    // this.address = this.curr_addr;
    //this.add_to_pass = this.mark_coordinate;
    //}
    //}
  }

  ionViewDidLoad() {
    //compare the database and check the existance trip for the day and bring the user to details page if exist
    this.storage.get('name').then((val) => { //should change and connect to database
      var storedname = val;

      if (storedname == undefined) {
      } else {
        //alert(storedname);
        this.navCtrl.setRoot(Passengerdetails, { source: this.haveRide = true });
      }
    })
  }

  // callback...
  myCallbackFunction(_params) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  goToMapPage(source) {
    //check soure where it is from insert info or edit when want to submit journey
    this.navCtrl.push(Maps, { passsource: source });
  }

  goToSearch() {
    // if (typeof this.address == undefined || this.add_to_pass == undefined) {
    if (typeof this.address == undefined) {
      alert("Address is empty! Please set. ");
    } else {
      this.navCtrl.push(Passengerresult, { sourceadd: this.address, coordinate: this.mark_coordinate });
    }
  }

  storeSomething() {
    this.storage.set('addr', this.add_to_pass);
    alert("Address Saved");
  }

  longPressReload() {
    location.reload();
  }
}
