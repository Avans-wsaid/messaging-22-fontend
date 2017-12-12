import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {IStats} from '../../../shared/IStats.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, IStats {
  title = 'users';
  amount: number;
  paramEmail: string;
  searchMode = false;

  users: User[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(
        (params: Params) => {
          this.paramEmail = params['name'];
          this.searchMode = params['name'] != null;
          if (this.searchMode) {
            this.userService.getUsersByName(this.paramEmail)
              .then((users) => {
                this.users = users;
                this.amount = this.count(this.users);
                if (this.amount === 1) {
                  this.title = 'user';
                }
              })
              .catch(error => console.log(error));
          } else {
            this.userService.getUsers()
              .then((users) => {
                this.users = users;
                this.amount = this.count(this.users);
                if (this.amount === 1) {
                  this.title = 'user';
                }
              })
              .catch(error => console.log(error));
          }
        }
      );
  }

  count(user: User[]): number {
    return user.length;
  }
}
