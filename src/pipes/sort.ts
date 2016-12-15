import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../pages/employee';

@Pipe({
  name: 'sort',
  pure: false
})
@Injectable()
export class Sort implements PipeTransform{

    transform(array: Array<Employee>, args?): Array<Employee> {
    array.sort((a: any, b: any) => {
      if (a.distance < b.distance) {
        return -1;
      } else if (a.distance > b.distance) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
