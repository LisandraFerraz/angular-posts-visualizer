import { Injectable } from '@angular/core';
import { ContentService } from './content.service';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadDataService {
  private pfpList = [
    'pfp/male-icon-1.png',
    'pfp/male-icon-2.png',
    'pfp/male-icon-3.png',
    'pfp/woman-icon-1.png',
    'pfp/woman-icon-2.png',
    'pfp/woman-icon-3.png',
  ];

  constructor(private contentService: ContentService) {}

  getAllPostObjects(): Observable<any[]> {
    return forkJoin({
      posts: this.contentService.getAllPosts(),
      users: this.contentService.getAllUsers(),
      comments: this.contentService.getAllComments(),
    }).pipe(
      map(({ posts, users, comments }) => {
        return posts.map((post) => {
          const user = users.find((u) => u.id === post.userId);
          const comment = comments.filter((c) => c.postId === post.id);
          const random = Math.floor(Math.random() * this.pfpList.length);

          return {
            userId: user!.id,
            postId: post.id,
            username: user!.name,
            title: post.title,
            postContent: post.body,
            commentQty: comment.length,
            comments: comment,
            pfp: this.pfpList[random],
          };
        });
      })
    );
  }

  getPostById(postId: number): Observable<any> {
    return forkJoin({
      posts: this.contentService.getAllPosts(),
      users: this.contentService.getAllUsers(),
      comments: this.contentService.getAllComments(),
    }).pipe(
      map(({ posts, users, comments }) => {
        const post = posts.find((p) => p.id === Number(postId));
        if (!post) return null;

        const user = users.find((u) => u.id === post.userId);
        const postComments = comments.filter((c) => c.postId === post.id);
        const random = Math.floor(Math.random() * this.pfpList.length);

        return {
          userId: user!.id,
          postId: post.id,
          username: user!.name,
          title: post.title,
          postContent: post.body,
          commentQty: postComments.length,
          comments: postComments,
          pfp: this.pfpList[random],
        };
      })
    );
  }
}
