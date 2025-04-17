import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from 'app/services/content.service';
import {
  IPosts,
  IPostsDisplay,
  IUser,
} from 'app/shared/utils/interfaces/content-interfaces';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent implements OnInit {
  @Input() postData!: IPostsDisplay;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateTo(data: IPostsDisplay) {
    this.router.navigateByUrl(`/post/${data.postId}`, {
      state: { savedData: data },
    });
  }

  isPostPage(): boolean {
    return !this.router.url.includes('home');
  }
}
