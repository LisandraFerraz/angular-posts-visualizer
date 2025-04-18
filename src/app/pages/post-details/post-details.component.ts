import {
  Component,
  computed,
  effect,
  Injector,
  OnChanges,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { CommentCardComponent } from 'app/shared/components/comment-card/comment-card.component';
import { PostCardComponent } from 'app/shared/components/post-card/post-card.component';
import {
  IComment,
  IPost,
  IPostsDisplay,
} from 'app/shared/utils/interfaces/content-interfaces';
import { NewCommentComponent } from '../../shared/components/new-comment/new-comment.component';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ReplyService } from 'app/services/reply.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [PostCardComponent, CommentCardComponent, NewCommentComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  postData!: IPostsDisplay;
  comments = signal<IComment[]>([]);

  newComment!: IPost;

  private sub$ = new Subject();

  constructor(public router: Router, private replyService: ReplyService) {
    const currentUrl = this.router.getCurrentNavigation();
    const savedData = currentUrl?.extras.state?.['savedData'];

    if (savedData) {
      this.comments.set(savedData.comments);
      this.postData = savedData;
    }
  }

  ngOnInit(): void {
    this.replyService.replyResTest$.pipe(takeUntil(this.sub$)).subscribe({
      next: (res) => {
        if (res) {
          this.comments.update((prev) => [
            ...prev,
            { ...res, postId: this.postData.postId },
          ]);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.sub$.next(true);
  }
}
