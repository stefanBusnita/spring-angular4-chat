import { MessageInterface } from './message-interface';
/**
 * Domain model for the message. Holds the actual message payload (String), and the user who sent the message(String)
 */
export class Message implements MessageInterface{
    constructor(public messagePayload:String,public username:String){}
}