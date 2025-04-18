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
import { ActivatedRoute, Router } from '@angular/router';
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
import { PostsDisplay, User } from 'app/shared/utils/classes/post-class';
import { LoadDataService } from 'app/services/load-data.service';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [PostCardComponent, CommentCardComponent, NewCommentComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  postData: PostsDisplay = new PostsDisplay();
  comments = signal<IComment[]>([]);

  newComment!: IPost;
  activeUser = signal<User>(new User());

  private sub$ = new Subject();

  constructor(
    public router: ActivatedRoute,
    private replyService: ReplyService,
    private userService: SetUserService,
    private loadDataService: LoadDataService
  ) {}

  ngOnInit(): void {
    this.getPostData();

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
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getPostData() {
    const currentId = this.router.snapshot.params['id'];
    this.loadDataService.getPostById(currentId).subscribe({
      next: (res) => {
        this.postData = res;
        this.comments.set(res.comments);
      },
    });
  }

  ngOnDestroy(): void {
    this.sub$.next(true);
  }
}
