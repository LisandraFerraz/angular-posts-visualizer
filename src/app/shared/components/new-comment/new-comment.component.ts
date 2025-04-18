import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReplyService } from 'app/services/reply.service';
import { SetUserService } from 'app/services/set-user.service';
import { Post } from 'app/shared/utils/classes/post-class';
import { IUser } from 'app/shared/utils/interfaces/content-interfaces';

@Component({
  selector: 'app-new-comment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-comment.component.html',
  styleUrl: './new-comment.component.scss',
})
export class NewCommentComponent implements OnInit {
  constructor(
    private replyService: ReplyService,
    private userService: SetUserService
  ) {}

  @Input() postId: number = 0;

  comment: Post = new Post();
  activeUser!: IUser;

  body: Post = {
    body: this.comment.body,
    title: '',
    userId: 0,
  };

  ngOnInit() {}

  postComment() {
    this.userService.activeUser$.subscribe(
      (user) =>
        (this.body = {
          ...this.body,
          userId: user!.id,
        })
    );

    this.replyService.sendPost(this.body, this.postId);
  }
}
