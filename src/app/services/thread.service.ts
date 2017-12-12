import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Thread} from '../models/thread.model';

@Injectable()
export class ThreadService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/threads';
  private userUrl = environment.serverUrl + '/users';
  private threads: Thread[] = [];
  constructor(private http: Http) { }
  public getThreads(): Promise<Thread[]> {
    return this.http.get(this.serverUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        return response.json() as Thread[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }
  public getUserThreads(id: string): Promise<Thread[]> {
    return this.http.get(this.userUrl + '/' + id + '/threads', { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        return response.json() as Thread[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }
  public getThread(id: string): Promise<Thread> {
    return this.http.get(this.serverUrl + '/' + id, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        return response.json() as Thread;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }
  public storeThreads(threads: Thread, id: string) {
    threads.user = id;
    return this.http.post(this.userUrl + '/' + id + '/threads', threads, { headers: this.headers });
  }
  public editThread(id: string, thread: Thread) {
    return this.http.put(this.serverUrl + '/' + id, thread, { headers: this.headers });
  }
  public deleteThread(id: string) {
    return this.http.delete(this.serverUrl + '/' + id, { headers: this.headers });
  }
  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

}
