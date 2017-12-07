import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import {UserEditComponent} from './components/user/user-edit/user-edit.component';
import {UserListComponent} from './components/user/user-list/user-list.component';

const appRoutes: Routes = [
  { path: 'users', component: UserComponent, children: [
    { path: 'list', component: UserListComponent },
    { path: 'create', component: UserEditComponent },
    { path: ':id/edit', component: UserEditComponent },
  ] },
  { path: '**', redirectTo: '/users/list' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
