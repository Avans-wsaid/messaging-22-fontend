import { UserService } from './services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { ThreadListComponent } from './components/thread/thread-list/thread-list.component';
import { ThreadComponent } from './components/thread/thread.component';
import {ThreadService} from './services/thread.service';
import { ThreadEditComponent } from './components/thread/thread-edit/thread-edit.component';
import { ThreadDetailComponent } from './components/thread/thread-detail/thread-detail.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentListComponent } from './components/comment/comment-list/comment-list.component';
import { CommentEditComponent } from './components/comment/comment-edit/comment-edit.component';
import { CommentDetailComponent } from './components/comment/comment-detail/comment-detail.component';
import {CommentService} from './services/comment.service';
import {TableRowDirective} from './shared/table-row-selected.directive';
import { SearchComponent } from './components/search/search.component';
import { CollapseModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HeaderComponent,
    UserEditComponent,
    UserListComponent,
    UserDetailComponent,
    ThreadListComponent,
    ThreadComponent,
    ThreadEditComponent,
    ThreadDetailComponent,
    CommentComponent,
    CommentListComponent,
    CommentEditComponent,
    CommentDetailComponent,
    TableRowDirective,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CollapseModule
  ],
  providers: [
    UserService, ThreadService, CommentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
