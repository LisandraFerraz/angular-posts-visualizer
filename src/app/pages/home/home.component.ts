import { Component, OnInit } from '@angular/core';
import { ContentService } from 'app/services/content.service';
import { PostCardComponent } from 'app/shared/components/post-card/post-card.component';
import { SearchBarComponent } from 'app/shared/components/search-bar/search-bar.component';
import {
  IComment,
  IPost,
  IPostsDisplay,
  IUser,
} from 'app/shared/utils/interfaces/content-interfaces';
import { forkJoin } from 'rxjs';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SlicePipe } from '@angular/common';
import { LoginModalComponent } from 'app/shared/components/login-modal/login-modal.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PostCardComponent,
    SearchBarComponent,
    NgbPaginationModule,
    SlicePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private contentService: ContentService,
    private ngModal: NgbModal
  ) {}

  postsList: IPost[] = [];
  usersList: IUser[] = [];
  commentList: IComment[] = [];

  newPostsList: IPostsDisplay[] = [];

  page: number = 1;
  pageSize: number = 5;

  ngOnInit(): void {
    // this.openModalLogin();
    this.getUsernPost();
  }

  getUsernPost() {
    forkJoin({
      posts: this.contentService.getAllPosts(),
      users: this.contentService.getAllUsers(),
      comments: this.contentService.getAllComments(),
    }).subscribe({
      next: ({ posts, users, comments }) => {
        this.postsList = posts;
        this.usersList = users;
        this.commentList = comments;

        this.createPostObject();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  createPostObject() {
    const pfpList = [
      'pfp/male-icon-1.png',
      'pfp/male-icon-2.png',
      'pfp/male-icon-3.png',
      'pfp/woman-icon-1.png',
      'pfp/woman-icon-2.png',
      'pfp/woman-icon-3.png',
    ];

    const newList = this.postsList.map((post) => {
      const user = this.usersList.find((u) => u.id === post.userId);
      const comment = this.commentList.filter((c) => c.postId === post.id);

      const random = Math.floor(Math.random() * pfpList.length);

      return {
        userId: user!.id,
        postId: post.id,
        username: user!.name,
        title: post.title,
        postContent: post.body,
        commentQty: comment.length,
        comments: comment,
        pfp: pfpList[random],
      };
    });
    this.newPostsList = newList;
  }

  openModalLogin() {
    console.log('hi');
    this.ngModal.open(LoginModalComponent, {
      centered: true,
      animation: true,
      backdrop: 'static',
    });
  }
}
