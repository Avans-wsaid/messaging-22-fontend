import {User} from './user.model';

export class Thread {
  constructor(public _id: string, public title: string, public content: string, public comments: Comment[], public user: User) {}
}
