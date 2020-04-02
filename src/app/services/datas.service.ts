
import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { map } from 'rxjs/operators';
import { Subject} from  'rxjs/Subject';
import { Observable, BehaviorSubject } from 'rxjs';
export type Item = { name: string, values:any };
@Injectable({
  providedIn: 'root',

})
export class DatasService {

constructor(private http : Http) { }
  getAllItems(){
    return this.http.get("https://pomber.github.io/covid19/timeseries.json").pipe(map(data => data.json() as Array<Item>));
  }

}
