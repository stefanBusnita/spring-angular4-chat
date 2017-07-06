import { FlashInterface } from './flash-interface';
/**
 * Application flash message domain class
 */
export class FlashMessage implements FlashInterface{
    constructor(public text: string,public type: string) {
    }
}