import { Injectable } from '@angular/core';

@Injectable()
export class UserServiceService {

  user;

  constructor() { }

  isPremium():boolean{
    return this.user.authorities.findIndex((authority)=>{ 
      return authority.authority == "ROLE_PREMIUM";
    })!=-1;
  }

}
