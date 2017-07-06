import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

/**
 * Responsible for the login action
 */
@Injectable()
export class LoginService {

  private environmentData = environment.httpConnect;

  constructor(private http: Http) {
  }

  doLogin(){

     let headers = new Headers({ 
          'Authorization': 'Basic ' + btoa("stef" + ':' + "password"),
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    });

    let options = new RequestOptions({ 
           headers: headers 
    });


    return this.http.get(this.environmentData.protocol + this.environmentData.path + ":" + this.environmentData.port + "/username",options)
      .map((response: Response) => response.json());
  }

}
