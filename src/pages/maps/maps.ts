import { Component, Input, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, ModalController, NavParams, Platform, Events, AlertController } from 'ionic-angular';
import { VIEW_ENCAPSULATION_VALUES } from '@angular/core/src/metadata/view';
import { SearchAutocomplete } from '../search-autocomplete/search-autocomplete';
import {
  Geocoder,
  Geolocation,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapsLatLng,
  CameraPosition,
  GoogleMapsMarkerOptions,
  GoogleMapsMarker
} from 'ionic-native';
import { HomePage } from '../home/home';
import { MapsAPILoader, ANGULAR_GOOGLE_MAPS_PROVIDERS, ANGULAR_GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';

//declare let plugin: any; 
declare var google, window, lat, lng;

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})
export class Maps {

  @ViewChild('map') mapElement: ElementRef;
  address: any;
  placesService: any;
  window: any;
  source: any;
  map: any;
  marker: any;
  //markers = [];
  placedetails: any;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController, public alertCtrl: AlertController, private platform: Platform, public navParams: NavParams) {
    this.source = navParams.get('passsource');
    this.address = {
      place: ''
    };
    //this.callback = navParams.get('callback');

    /*platform.ready().then(() => {
      this.initMap();
      this.initPlacedetails();
    });*/
  }

  ionViewDidLoad() {
    this.initMap();
    this.initPlacedetails();
    //get emp address from database
    /*this.http.get(global.getUrl() + '/' + global.getID())
       .map(res => res.json())
       .subscribe((res) => {
         this.address = res.rows[0].empaddress;
         this.coordinate = res.rows[0].empcoordinate;
       });*/
  }

  initMap() {
    //initialize the map with current position or previous set address
    /*if (this.address == undefined){
      get current location;
    } else {
      get coordinate from db then set it to latlng to initialize the map with previous set address
    }
    */
    Geolocation.getCurrentPosition().then((position) => {
      //alert("initMap");
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        disableDefaultUI: true,
        draggable: true,
        zoomControl: true
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      //add marker initially
      this.marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        title: 'Drag Me'
      });

      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(
        () => this.onMapReady(),
        () => alert('Error: onMapReady')
      );
    },
      (err) => {
        console.log(err);
      });

  }

  //use to convert the marker coordinate to readable address.
  convertAddress(loc) {

    var addr;
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': loc }, (data, status) => {

      if (status === google.maps.GeocoderStatus.OK) {
        if (data[0]) {
          alert("first " + data[0].formatted_address);
          addr = data[0].formatted_address;
          loc = loc.toString();
          loc = loc.slice(1, -1);

          /*let params =
          {
            num: global.getID(),
            address: this.address,
            coordinate: this.coordinate
          };
    
        let body = JSON.stringify(params);
        let head = new Headers({
          'Content-Type': 'application/json'
        });
    
        this.http.post(this._baseUrl + '/edit', body, { headers: head }) //update employeeinfo
        .map(res => res.json())
          .subscribe(
          data => { console.log(JSON.stringify(data)); }, //JSON.stringify(data)); is convert JSON to string
          err => console.log(err),
          () => console.log('Fetching complete for Server Metrics')
          );    
         */

          this.navCtrl.setRoot(HomePage, { address_name: addr, coordinate: loc });
        } else {
          alert("No address available");
        }
      }

    })
    //return addr;
    //alert("second " + addr);
    //this.navCtrl.setRoot(HomePage, { address_name: addr, coordinate: loc });
  }

  private onMapReady() {
    alert('Map ready');
  }

  showAddressModal() {
    // reset 
    this.reset();
    // show modal
    let modal = this.modalCtrl.create(SearchAutocomplete);
    modal.onDidDismiss(data => {
      console.log('page > modal dismissed > data > ', data);
      if (data) {
        this.address.place = data.description;
        // get details
        this.getPlaceDetail(data.place_id);
      }
    })
    modal.present();
  }

  showModal() {
    let modal = this.modalCtrl.create(SearchAutocomplete);
    let me = this;
    modal.onDidDismiss(data => {
      this.address.place = data;
    });
    modal.present();
  }

  private reset() {
    this.initPlacedetails();
    this.address.place = '';
    this.address.set = false;
    console.log('reset');
  }

  private getPlaceDetail(place_id: string): void {
    var self = this;
    var request = {
      placeId: place_id
    };
    this.placesService = new google.maps.places.PlacesService(this.map);
    this.placesService.getDetails(request, callback);
    function callback(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log('page > getPlaceDetail > place > ', place);
        // set full address
        self.placedetails.address = place.formatted_address;
        self.placedetails.lat = place.geometry.location.lat();
        self.placedetails.lng = place.geometry.location.lng();
        for (var i = 0; i < place.address_components.length; i++) {
          let addressType = place.address_components[i].types[0];
          let values = {
            short_name: place.address_components[i]['short_name'],
            long_name: place.address_components[i]['long_name']
          }
          if (self.placedetails.components[addressType]) {
            self.placedetails.components[addressType].set = true;
            self.placedetails.components[addressType].short = place.address_components[i]['short_name'];
            self.placedetails.components[addressType].long = place.address_components[i]['long_name'];
          }
        }
        // set place in map
        self.map.setCenter(place.geometry.location);
        self.createMapMarker(place);
        // populate
        self.address.set = true;
        console.log('page > getPlaceDetail > details > ', self.placedetails);
      } else {
        console.log('page > getPlaceDetail > status > ', status);
      }
    }
  }

  private createMapMarker(place: any) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: placeLoc,
      draggable: true
    });
    //this.markers.push(marker);
    this.marker = marker;
  }

  private initPlacedetails() {
    this.placedetails = {
      address: '',
      lat: '',
      lng: '',
      components: {
        route: { set: false, short: '', long: '' },
        street_number: { set: false, short: '', long: '' },
        sublocality_level_1: { set: false, short: '', long: '' },
        locality: { set: false, short: '', long: '' },
        administrative_area_level_2: { set: false, short: '', long: '' },
        administrative_area_level_1: { set: false, short: '', long: '' },
        country: { set: false, short: '', long: '' },
        postal_code: { set: false, short: '', long: '' },
        postal_code_suffix: { set: false, short: '', long: '' },
      }
    };
  }

  //showing toast message
  showToast(message) {
    this.platform.ready().then(() => {
      window.plugins.toast.show(message, "short", "bottom");
    });
  }

  //set the desire location as source address
  setToHome() {
    //alert to confirm the place chosen
    let confirm = this.alertCtrl.create({
      title: 'Home location',
      message: 'Confirm to use this location as the source?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            this.showToast('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            //this.showToast('Agree clicked');
            //alert(this.source);

            let myLoc = this.marker.getPosition();
            this.convertAddress(myLoc);
            //let currAdd = this.convertAddress(myLoc);
            //alert("The curr add is " + currAdd);
            // myLoc = myLoc.toString();
            //myLoc = myLoc.slice(1, -1);

            //let myArea = this.marker.getOrigin();
            //if (this.source == 'source') {
            //alert(myLoc + this.address.place);
            //  this.navCtrl.setRoot(HomePage, { address_name: currAdd, coordinate: myLoc });
            // } else if (this.source == '1stDest') {
            //  this.navCtrl.push(HomePage, { param2: myLoc });
            //} else {
            //  this.navCtrl.push(HomePage, { param3: myLoc });
            // }
          }
        }
      ]
    });
    confirm.present();
  }
}
