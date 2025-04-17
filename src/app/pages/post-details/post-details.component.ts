import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommentCardComponent } from 'app/shared/components/comment-card/comment-card.component';
import { PostCardComponent } from 'app/shared/components/post-card/post-card.component';
import { IPostsDisplay } from 'app/shared/utils/interfaces/content-interfaces';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [PostCardComponent, CommentCardComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
})
export class PostDetailsComponent {
  constructor(public router: Router) {
    const currentUrl = this.router.getCurrentNavigation();
    this.postData = currentUrl?.extras.state?.['savedData'];
  }

  postData!: IPostsDisplay;
}
