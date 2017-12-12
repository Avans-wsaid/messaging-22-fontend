import { Component, OnInit } from '@angular/core';
import {CommentService} from '../../../services/comment.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Comment} from '../../../models/comment.model';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css']
})
export class CommentDetailComponent implements OnInit {

  comment: Comment;
  id: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.commentService.getComment(this.id)
            .then((comment) => {
              this.comment = comment;
            })
            .catch(error => console.log(error));
        }
      );
  }

}
