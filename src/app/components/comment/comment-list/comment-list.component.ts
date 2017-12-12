import {Component, OnDestroy, OnInit} from '@angular/core';
import {Comment} from '../../../models/comment.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CommentService} from '../../../services/comment.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, OnDestroy {

  title = 'Comments';
  comments: Comment[];
  threadMode = false;
  id: string;
  private subscription: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commentService: CommentService
  ) { }
  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.threadMode = params['id'] != null;
          this.subscription = this.commentService.notifyObservable$.subscribe((res) => {
            this.commentService.getThreadComments(this.id)
              .then(comments => this.comments = comments)
              .catch(error => console.log(error));
          });
          if (this.threadMode) {
            this.commentService.getThreadComments(this.id)
              .then(comments => this.comments = comments)
              .catch(error => console.log(error));
          } else {
            this.commentService.getComments()
              .then(comments => this.comments = comments)
              .catch(error => console.log(error));
          }
        }
      );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
