import {User} from './user.model';

export class Thread {
  constructor(public title: string, public content: string, public comments: Comment[], public user: string) {}
}
