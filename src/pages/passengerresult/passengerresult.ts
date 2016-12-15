import { Component, Pipe } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { HttpService } from "../services/distanceservice";
import 'rxjs/Rx';
import { LoadingController } from "ionic-angular";
import { Passengerdetails } from "../passengerdetails/passengerdetails";
import { Employee } from "../employee";
import { Sort } from "../src/pipes/sort";
import { Storage } from '@ionic/storage';
//import * as global from '../globaluserinfo';

declare var google;
@Component({
  selector: 'page-passengerresult',
  templateUrl: 'passengerresult.html',
  providers: [HttpService]
})

export class Passengerresult {

 //private _baseUrl: string = global.getUrl();//link to server
  person: Array<Employee> = [];
  getData: any;
  getDistance: any;
  source_addr: any;
  source_coor: any;
  destination_addr: any;
  originList: any;
  destinationList: Array<String> = [];
  testList: any;
  filteredList: Array<Employee> = [];
  sortedList: any;
  selectedPassenger: any;
  item: any;
  tmplink_1: any;
  storedaddr: any;

  constructor(private storage: Storage, public navCtrl: NavController, private navParams: NavParams, private http: Http, private httpService: HttpService, public loadingCtrl: LoadingController) {
    this.source_addr = navParams.get('sourceadd');
    this.source_coor = navParams.get('coordinate');
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Searching, Please Wait...'
    });

    //loop to get data from database and bind it temporary

    // this.http.get(this._baseUrl + '/passenger')
    //  .map(res => res.json())
    //  .subscribe((res) => {

    /*take empaddress everytime they have save and load to this page */
    //console.log(res);

    //if (res.rowCount != 0) { /*if not 0, it has value into it */
    //  let initCount = res.rowCount;
    //  for (var a = 0; initCount > a; initCount--) {
    //    let emp = new Employee(res.rows[a].nid, res.rows[a].name, res.rows[a].coordinate, res.rows[a].contact,  res.rows[a].distance); // one more res.rows[a].empaddress
    //    this.person.push(emp);
    //  }
    //}
    // });


    //let emp_1 = new Employee(1150409, "wenxuan1234567894563214", "5.362832, 100.303273", "0172469767", 0);
    let emp_1 = new Employee();
    emp_1.setNid(1150409);
    emp_1.setName("wenxuan1234567894563214");
    emp_1.setCoordinate("5.362832, 100.303273");
    emp_1.setContact("0172469767");
    emp_1.setDistance(0);

    let emp_2 = new Employee();
    emp_2.setNid(1123465);
    emp_2.setName("puxuan");
    emp_2.setCoordinate("5.355966, 100.302625");
    emp_2.setContact("0176855669");
    emp_2.setDistance(0);

    //let emp_2 = new Employee(1123465, "puxuan", "5.355966, 100.302625", "0176855669", 0);
    //let emp_3 = new Employee(1298654, "mom", "5.353136, 100.303026", "0178862964", 0);
    //let emp_4 = new Employee(1785421, "sis", "5.328766, 100.290575", "0123680280", 0);
    //let emp_5 = new Employee(1596214, "dad", "5.294410, 100.256586", "0193098410", 0);

    loading.present(loading);

    this.person.push(emp_1);
    this.person.push(emp_2);
    //this.person.push(emp_3);
    //this.person.push(emp_4);
    //this.person.push(emp_5);

    this.onGetDistance(this.person);

    loading.dismiss();
  }

  goToDetails(nid, name, contact, coordinate, distance) {
    //open to details page to view passenger details
    //alert(nid);
    this.navCtrl.push(Passengerdetails, { src_addr: this.source_coor, nid: nid, name: name, contact: contact, coordinate: coordinate, distance: distance });
  }

  onGetDistance(person) {
    //loop to get all pasenger distance between driver
    for (let a = 0; a < person.length; a++) {

      let dest_ = person[a].getCoordinate();
      //let source_ = this.source_addr.toString();
      let source_ = this.source_addr;
      //source_ = source_.slice(1, -1);

      this.httpService.retrieveJSON(source_, dest_)
        .subscribe(

        data => {
          //extract the JSON and get the specific data
          let rows = data.rows;
          let element = rows[0].elements;
          let distance = element[0].distance;
          let value = distance.text;
          let km = JSON.stringify(value);
          km = km.slice(1, -3);

          //convert value to double
          let result = parseFloat(km);

          //compare to get within the range
          if (result) {
            person[a].setDistance(result);
            //alert(person[a].distance);
            this.filteredList.push(person[a]);
          }
        },
        error => alert(error),
        () => console.log("Finished")
        );
    }
  }

  showStored() {
    this.storage.get('addr').then((val) => {
      console.log('Your address is', val);
      this.storedaddr = val;
    })
  }
}

