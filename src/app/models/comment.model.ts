import {User} from './user.model';

export class Comment {
  constructor(public content: string, public user: User) {}
}
