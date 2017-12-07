import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  title = 'Users';
  users: User[];
  newUser = new User('lala1', 'lala2', 'lala3');
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }
  ngOnInit(): void {
    this.userService.getUsers()
      .then(users => this.users = users)
      .catch(error => console.log(error));
  }
}
