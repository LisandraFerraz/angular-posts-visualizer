import { Injectable } from '@angular/core';
import { ContentService } from './content.service';
import { forkJoin, map, Observable } from 'rxjs';
import { pfpList } from 'app/shared/utils/pfps';

@Injectable({ providedIn: 'root' })
export class LoadDataService {
  constructor(private contentService: ContentService) {}

  getAllPostObjects(params?: {}): Observable<any[]> {
    return forkJoin({
      posts: this.contentService.getAllPosts(params),
      users: this.contentService.getAllUsers(),
      comments: this.contentService.getAllComments(),
    }).pipe(
      map(({ posts, users, comments }) => {
        return posts.map((post) => {
          const user = users.find((u) => u.id === post.userId);
          const comment = comments.filter((c) => c.postId === post.id);
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
        const random = Math.floor(Math.random() * pfpList.length);

        return {
          userId: user!.id,
          postId: post.id,
          username: user!.name,
          title: post.title,
          postContent: post.body,
          commentQty: postComments.length,
          comments: postComments,
          pfp: pfpList[random],
        };
      })
    );
  }
}
