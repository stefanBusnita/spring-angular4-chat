import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable, Subscription } from 'rxjs/Rx';
import { Headers, Http, Response } from '@angular/http';

@Injectable()
export class AuthService {

  private environmentData = environment.httpConnect;

  constructor(private http: Http) {
  }

  tryToGetUserDetails() {
    return this.http.get(this.environmentData.protocol + this.environmentData.path + ":" + this.environmentData.port + "/username")
      .map((response: Response) => response.json()).catch((err: Response) => {
        let details = err.json();
        return Observable.throw(details);
      });
  }

}
