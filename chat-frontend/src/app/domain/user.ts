import { UserInterface } from './user-interface';
/**
 * Represents a chat User.
 */
export class User implements UserInterface {
    constructor(public username: String, public loggedAt: String) { }

}