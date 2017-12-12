import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ThreadService} from '../../../services/thread.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-thread-edit',
  templateUrl: './thread-edit.component.html',
  styleUrls: ['./thread-edit.component.css']
})
export class ThreadEditComponent implements OnInit {

  id: string;
  userId: string;
  editMode = false;
  threadForm: FormGroup;
  title = 'Create a new thread';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private threadService: ThreadService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.userId = params['user'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }
  onCancel() {
    this._location.back();
  }
  private initForm() {
    this.threadForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'content': new FormControl('', Validators.required)
    });
    if (this.editMode) {
      this.title = 'Edit a thread';
      this.threadService.getThread(this.id)
        .then((thread) => {
          this.threadForm.setValue({title: thread.title, content: thread.content});
        })
        .catch(error => console.log(error));
    }

  }
  onSaveThread() {
    if (this.editMode) {
      this.threadService.editThread(this.id, this.threadForm.value)
        .subscribe(
          (response) => this._location.back(),
          (error) => console.log(error)
        );
    } else {
      this.threadService.storeThreads(this.threadForm.value, this.userId)
        .subscribe(
          (response) => this._location.back(),
          (error) => console.log(error)
        );

    }
  }
  onDeleteThread() {
    this.threadService.deleteThread(this.id)
      .subscribe(
        (response) => this._location.back(),
        (error) => console.log(error)
      );
  }
}
