/**
 * Used as a representation of a subscription pair by the client.
 * A subscription pair is represented by a link, and a callback function.
 */
export class SubscribeFunctionWrapper {
    constructor(private subscriptionLink: String, private functionCall: Function) { }

    getSubscriptionLink(): String {
        return this.subscriptionLink;
    }

    getFunctionCall(): Function {
        return this.functionCall;
    }
}