import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Comment} from '../models/comment.model';
import {Subject} from "rxjs/Subject";

@Injectable()
export class CommentService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/comments';
  private threadUrl = environment.serverUrl + '/threads';
  private notify = new Subject<any>();
  notifyObservable$ = this.notify.asObservable();
  constructor(private http: Http) { }
  public getComments(): Promise<Comment[]> {
    return this.http.get(this.serverUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        return response.json() as Comment[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }
  public getThreadComments(id: string): Promise<Comment[]> {
    return this.http.get(this.threadUrl + '/' + id + '/comments', { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        return response.json() as Comment[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }
  public getComment(id: string): Promise<Comment> {
    return this.http.get(this.serverUrl + '/' + id, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        return response.json() as Comment;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }
  public storeComments(comments: Comment, id: string, userId: string) {
    return this.http.post(this.threadUrl + '/' + id + '/comments', {content: comments.content, user: userId}, { headers: this.headers });
  }
  public notifyOnCommentSave() {
      this.notify.next();
  }
  public editComment(id: string, comment: Comment) {
    return this.http.put(this.serverUrl + '/' + id, comment, { headers: this.headers });
  }
  public deleteComment(id: string) {
    return this.http.delete(this.serverUrl + '/' + id, { headers: this.headers });
  }
  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

}
