import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {

  constructor(private http: Http) { 
  }

  retrieveJSON(source, dest) {
    let apikey = 'AIzaSyDzpAu9Z_DODC_Jux7VrhBtwiK0WiMqIf8';
    //let apikey = 'AIzaSyBdy7ozTjTYKaGQcut2_nPPU2f7kIoUZo4';
    var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + source + '&destinations=' + dest + '&key=' + apikey;
    //var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=5.350334, 100.307366&destinations=5.294464, 20100.25932720000003' + '&key=' + apikey;
    return this.http.get(url)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || ' error');
    }
}