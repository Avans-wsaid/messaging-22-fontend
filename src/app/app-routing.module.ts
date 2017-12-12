import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import {UserEditComponent} from './components/user/user-edit/user-edit.component';
import {UserListComponent} from './components/user/user-list/user-list.component';
import {UserDetailComponent} from './components/user/user-detail/user-detail.component';
import {ThreadListComponent} from './components/thread/thread-list/thread-list.component';
import {ThreadComponent} from './components/thread/thread.component';
import {ThreadEditComponent} from './components/thread/thread-edit/thread-edit.component';
import {ThreadDetailComponent} from './components/thread/thread-detail/thread-detail.component';
import {CommentComponent} from './components/comment/comment.component';
import {CommentListComponent} from './components/comment/comment-list/comment-list.component';
import {CommentDetailComponent} from './components/comment/comment-detail/comment-detail.component';
import {CommentEditComponent} from './components/comment/comment-edit/comment-edit.component';

const appRoutes: Routes = [
  { path: 'users', component: UserComponent, children: [
    { path: 'list', component: UserListComponent },
    { path: 'create', component: UserEditComponent },
    { path: ':id', component: UserDetailComponent },
    { path: ':id/edit', component: UserEditComponent },
  ] },
  { path: 'threads', component: ThreadComponent, children: [
    { path: 'list', component: ThreadListComponent },
    { path: 'create/:user', component: ThreadEditComponent },
    { path: ':id/edit', component: ThreadEditComponent },
    { path: ':id', component: ThreadDetailComponent },
    { path: ':id/:user', component: ThreadDetailComponent },
  ] },
  { path: 'comments', component: CommentComponent, children: [
    { path: 'list', component: CommentListComponent },
    { path: 'create/:thread/:user', component: CommentEditComponent },
    { path: ':id/edit', component: CommentEditComponent },
    { path: ':id', component: CommentDetailComponent },
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
