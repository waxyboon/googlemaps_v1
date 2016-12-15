import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { NavController, ViewController, Platform } from 'ionic-angular';

declare var google: any;

@Component({
  templateUrl: 'search-autocomplete.html'
})
export class SearchAutocomplete {
  
  autocompleteItems: any;
  autocomplete: any;
  acService: any;
  placesService: any;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private platform: Platform) {

    this.acService = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
    console.log('modal > chooseItem > item > ', item);
    this.viewCtrl.dismiss(item);
  }

  updateSearch() {
    console.log('modal > updateSearch');
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let self = this;
    let config = {
      types: ['geocode'],
      input: this.autocomplete.query,
      componentRestrictions: { country: 'MY' }
    }
    this.acService.getPlacePredictions(config, function (predictions, status) {
      console.log('modal > getPlacePredictions > status > ', status);
      self.autocompleteItems = [];
      predictions.forEach(function (prediction) {
        self.autocompleteItems.push(prediction);
      });
    });
  }
}


