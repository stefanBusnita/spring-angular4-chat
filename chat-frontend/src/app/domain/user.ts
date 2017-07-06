/**
 * Represents a chat User.
 */
export class User{
    constructor(public username:String,private loggedAt:String){}

    getUsername():String{
        return this.username;
    }

    getLoggedAt():String{
        return this.loggedAt;
    }
}