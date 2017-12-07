import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/users';
  private users: User[] = [];

  constructor(private http: Http) { }
  public getUsers(): Promise<User[]> {
    return this.http.get(this.serverUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        return response.json() as User[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }
  public getUser(id: string): Promise<User> {
    return this.http.get(this.serverUrl + '/' + id, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        return response.json() as User;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }
  public storeUsers(users: User) {
    return this.http.post(this.serverUrl, users, { headers: this.headers });
  }
  public editUser(id: string, user: User) {
    return this.http.put(this.serverUrl + '/' + id, user, { headers: this.headers });
  }
  public deleteUser(id: string) {
    return this.http.delete(this.serverUrl + '/' + id,{ headers: this.headers });
  }
  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

}
