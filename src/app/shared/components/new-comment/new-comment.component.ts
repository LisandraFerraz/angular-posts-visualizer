import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentService } from 'app/services/content.service';
import { ReplyService } from 'app/services/reply.service';
import { Post } from 'app/shared/utils/classes/post-class';
import { IPost } from 'app/shared/utils/interfaces/content-interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-comment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-comment.component.html',
  styleUrl: './new-comment.component.scss',
})
export class NewCommentComponent {
  constructor(
    private contentService: ContentService,
    private replyService: ReplyService
  ) {}

  @Input() postId: number = 0;

  comment: Post = new Post();

  body: Post = {
    body: this.comment.body,
    title: '',
    userId: 1,
  };

  postComment() {
    this.replyService.sendPost(this.body, this.postId);
  }
}
