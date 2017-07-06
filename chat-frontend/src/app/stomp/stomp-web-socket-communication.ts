import *as SockJS from 'sockjs-client';
/**
 * The connection and subscription API for te sockJs client.
 */
export interface StompWebSocketCommunication<T> {

    sock: T; //the sock js instance 

    initialize(url: String): void; //initialize the sock js instance with a provided url

    connect(success: any): void; //connect to the instance

    subscribe(destination: String, callback: any): void; //subscribe to an event

    send(destination:String,payload:Object):void; //send payload to a server destination
}
