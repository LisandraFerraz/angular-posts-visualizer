import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPostsDisplay } from 'app/shared/utils/interfaces/content-interfaces';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  @Input() postData!: any;
  @Input() showPfp: boolean = true;

  constructor(private router: Router) {}

  navigateTo(data: IPostsDisplay) {
    this.router.navigateByUrl(`/post/${data.postId}`, {
      state: { savedData: data },
    });
  }

  navigateToUser(userId: number) {
    this.router.navigateByUrl(`/profile/${userId}`);
  }

  isPostPage(): boolean {
    return this.router.url.includes('post');
  }
}
