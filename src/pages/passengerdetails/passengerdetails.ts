import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { Geolocation, GoogleMap, GoogleMapsMarker, GoogleMapsLatLng, GoogleMapsEvent } from 'ionic-native';
import { DomSanitizer } from "@angular/platform-browser";
import { Storage } from '@ionic/storage';
import { Rating } from '../rating/rating';
import { HomePage } from '../home/home';

declare var google;

@Component({
  selector: 'page-details',
  templateUrl: 'passengerdetails.html'
})
export class Passengerdetails {

  @ViewChild('mapframe') frameElement;
  src_add: any;
  nid: any;
  name: any;
  contact: any;
  coordinate: any;
  distance: any;
  link: any;
  tmplat: any;
  tmplng: any;
  url: any;
  directionLink: any;
  haveRide: boolean = false;

  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private domSanitizer: DomSanitizer, public alertCtrl: AlertController) {
    this.haveRide = navParams.get('source');
    if (this.haveRide == true) {
      this.storage.get('src_addr').then((val) => {
        this.src_add = val;
        //alert("src" + this.src_add);
      })
      this.storage.get('nid').then((val) => {
        this.nid = val;
      })
      this.storage.get('name').then((val) => {
        this.name = val;
      })
      this.storage.get('contact').then((val) => {
        this.contact = val;
      })
      this.storage.get('url').then((val) => {
        //this.url = val;
        //alert(this.url);
      })

      this.storage.get('dest_addr').then((val) => {
        this.coordinate = val;
        //alert(this.coordinate);
        //alert("dest"+val);    
      })
      this.storage.get('distance').then((val) => {
        this.distance = val;
        //alert(this.distance); 
        //alert(""+val);   
      })


    } else {

      this.src_add = navParams.get('src_addr');
      this.nid = navParams.get('nid');
      this.name = navParams.get('name');
      this.contact = navParams.get('contact');
      this.coordinate = navParams.get('coordinate');
      this.distance = navParams.get('distance');

    }
  }

  ngOnInit() {
    //if (this.coordinate == undefined) { location.reload(); }
    //alert("dest in onInit " + this.coordinate);
    //alert("src in onInit " + this.src_add);
    //insert the coordinate, get the link for display the maps in details page
    this.url = "https://www.google.com/maps/embed/v1/directions?origin=" + this.src_add + "&destination=" + this.coordinate + "&key=AIzaSyDzpAu9Z_DODC_Jux7VrhBtwiK0WiMqIf8"
    this.directionLink = this.domSanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  giveRide() {
    //remove the ppl from db
    //save to local storage

    let confirm = this.alertCtrl.create({
      title: 'Alert',
      message: 'Confirm to fetch this passenger?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.saveInLocal();
            alert("You choose to fetch " + this.name);
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    confirm.present();
  }

  saveInLocal() {
    //save the details into local storage  
    this.storage.set('name', this.name);
    this.storage.set('dest_addr', this.coordinate);
    this.storage.set('contact', this.contact);
    this.storage.set('distance', this.distance);
    this.storage.set('src_addr', this.src_add);
    this.storage.set('url', this.url);
    //alert("Details Saved!!" + "name:" + this.name + " dest_addr:" + this.coordinate + " contact:" + this.contact + " distance:" + this.distance + " src_addr:" + this.src_add);
  }

  removeStored() {
    this.storage.remove('name');
    alert("Name Removed");
  }

  //this code is for passenger to go to review page
  tripCompleted() {
    this.navCtrl.push(Rating);
  }

  notCompleted(){
    this.storage.remove('name');
    alert("Not Counted, trip incomplete!");
    this.navCtrl.setRoot(HomePage);
  }
}
