import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Thread} from '../../../models/thread.model';
import {ThreadService} from '../../../services/thread.service';
import {IStats} from "../../../shared/IStats.interface";

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit, IStats {

  threads: Thread[];
  id: string;
  amount: number;
  userMode = false;
  title = 'threads';
  subtitle = 'No threads have been found.';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private threadService: ThreadService
  ) { }
  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.userMode = params['id'] != null;
          if (this.userMode) {
            this.title = 'Your threads';
            this.subtitle = 'You haven\'t created any threads yet.';
            this.threadService.getUserThreads(this.id)
              .then(threads => this.threads = threads)
              .catch(error => console.log(error));

          } else {
            this.threadService.getThreads()
              .then((threads) => {
                this.threads = threads;
                this.amount = this.count(this.threads);
                if (this.amount === 1) {
                  this.title = 'thread';
                }
              })
              .catch(error => console.log(error));

          }
        }
      );
  }

  count(thread: Thread[]): number {
    return thread.length;
  }
}
