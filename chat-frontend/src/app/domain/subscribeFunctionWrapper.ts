import { SubscribeFunctionWrapperInterface } from './subscribeFunctionWrapperInterface';
/**
 * Used as a representation of a subscription pair by the client.
 * A subscription pair is represented by a link, and a callback function.
 */
export class SubscribeFunctionWrapper implements SubscribeFunctionWrapperInterface{
    constructor(public subscriptionLink: String, public functionCall: Function) { }

}