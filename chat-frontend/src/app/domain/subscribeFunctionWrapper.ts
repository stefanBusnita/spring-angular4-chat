export class SubscribeFunctionWrapper {
    constructor(private subscriptionLink: String, private functionCall: Function) { }

    getSubscriptionLink(): String {
        return this.subscriptionLink;
    }

    getFunctionCall(): Function {
        return this.functionCall;
    }
}