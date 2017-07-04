import { StompConnectionServiceService } from './../stomp/stomp-connection-service.service';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class LogoutService {



  private environmentData = environment.httpConnect;

  constructor(private stompConnectionService:StompConnectionServiceService,private http: Http) {
  }

  doLogout() {
    console.log("inside do logout");
    this.stompConnectionService.disconnect();
    return this.http.post(this.environmentData.protocol + this.environmentData.path + ":" + this.environmentData.port + "/logout",{})
      .map((response: Response) =>{}).subscribe((response:any)=>{console.log("response")});
  }

}
