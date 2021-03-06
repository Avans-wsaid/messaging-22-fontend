import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UserService} from '../../../services/user.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  id: string;
  editMode = false;
  userForm: FormGroup;
  title = 'Create a new user';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }
  onCancel() {
    this.router.navigate(['/']);
  }
  private initForm() {
    this.userForm = new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email])
    });
    if (this.editMode) {
      this.title = 'Edit a user';
      this.userService.getUser(this.id)
        .then((user) => {
          this.userForm.setValue({firstName: user.firstName, lastName: user.lastName, email: user.email});
        })
        .catch(error => console.log(error));
    }

  }
  onSaveUser() {
    if (this.editMode) {
      this.userService.editUser(this.id, this.userForm.value)
        .subscribe(
          (response) => this.router.navigate(['/']),
          (error) => console.log(error)
        );
    } else {
      this.userService.storeUsers(this.userForm.value)
        .subscribe(
          (response) => this.router.navigate(['/']),
          (error) => console.log(error)
        );
    }
  }
  onDeleteUser() {
    this.userService.deleteUser(this.id)
      .subscribe(
        (response) => this.router.navigate(['/']),
        (error) => console.log(error)
      );
  }
}
