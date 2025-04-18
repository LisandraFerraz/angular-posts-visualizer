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
  IUser,
} from 'app/shared/utils/interfaces/content-interfaces';
import { NewCommentComponent } from '../../shared/components/new-comment/new-comment.component';
import { forkJoin, single, Subject, Subscription, takeUntil } from 'rxjs';
import { ReplyService } from 'app/services/reply.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { SetUserService } from 'app/services/set-user.service';
import { ContentService } from 'app/services/content.service';
import { User } from 'app/shared/utils/classes/post-class';

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
  activeUser = signal<User>(new User());

  private sub$ = new Subject();

  constructor(
    public router: Router,
    private replyService: ReplyService,
    private userService: SetUserService
  ) {
    const currentUrl = this.router.getCurrentNavigation();
    const savedData = currentUrl?.extras.state?.['savedData'];

    if (savedData) {
      this.comments.set(savedData.comments);
      this.postData = savedData;
    }
  }

  ngOnInit(): void {
    this.userService.activeUser$.subscribe((user) => {
      if (user) this.activeUser.set(user);
    });

    this.replyService.replyResTest$.pipe(takeUntil(this.sub$)).subscribe({
      next: (res) => {
        if (res) {
          this.comments.update((prev) => [
            ...prev,
            {
              ...res,
              postId: this.postData.postId,
              email: this.activeUser()?.email ?? '',
            },
          ]);
        }
        console.log(this.comments());
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
