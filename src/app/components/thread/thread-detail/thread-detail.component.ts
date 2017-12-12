import { Component, OnInit } from '@angular/core';
import {ThreadService} from '../../../services/thread.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Thread} from '../../../models/thread.model';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.css']
})
export class ThreadDetailComponent implements OnInit {

  thread: Thread;
  id: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private threadService: ThreadService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.threadService.getThread(this.id)
            .then((thread) => {
              this.thread = thread;
            })
            .catch(error => console.log(error));
        }
      );
  }
}
