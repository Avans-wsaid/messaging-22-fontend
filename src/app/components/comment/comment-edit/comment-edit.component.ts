import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {CommentService} from '../../../services/comment.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent implements OnInit {

  id: string;
  userId: string;
  userMode = false;
  commentForm: FormGroup;
  title = 'Leave a comment';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.userId = params['user'];
          this.userMode = params['user'] != null;
          this.initForm();
        }
      );
  }
  onCancel() {
    this._location.back();
  }
  private initForm() {
    this.commentForm = new FormGroup({
      'content': new FormControl('', Validators.required)
    });
    if (!this.userMode) {
      this.title = 'Edit comment';
      this.commentService.getComment(this.id)
        .then((comment) => {
          this.commentForm.setValue({content: comment.content});
        })
        .catch(error => console.log(error));
    }

  }
  onSaveComment() {
    if (!this.userMode) {
      this.commentService.editComment(this.id, this.commentForm.value)
        .subscribe(
          (response) => this._location.back(),
          (error) => console.log(error)
        );
    } else {
      this.commentService.storeComments(this.commentForm.value, this.id, this.userId)
        .subscribe(
          (response) => {
            this.commentService.notifyOnCommentSave();
            this.commentForm.setValue({content: ' '});
          }
          ,
          (error) => console.log(error)
        );

    }
  }
  onDeleteComment() {
    this.commentService.deleteComment(this.id)
      .subscribe(
        (response) => this._location.back(),
        (error) => console.log(error)
      );
  }

}
