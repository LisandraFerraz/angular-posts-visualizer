import { Injectable } from '@angular/core';
import { Post } from 'app/shared/utils/classes/post-class';
import {
  IComment,
  IPost,
  IUser,
} from 'app/shared/utils/interfaces/content-interfaces';
import { ApiCoreService } from 'core/api-core.service';
import { endpoints } from 'core/endepoint';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private api: ApiCoreService) {}

  getAllPosts(params?: {}): Observable<IPost[]> {
    return this.api.get(endpoints.posts, { params });
  }

  createPost(body: Post) {
    return this.api.post(endpoints.posts, body);
  }

  getAllUsers(params?: {}): Observable<IUser[]> {
    return this.api.get(endpoints.users, { params });
  }

  getUser(id: number): Observable<IUser> {
    return this.api.get(`${endpoints.users}/${id}`);
  }

  getAllComments(params?: {}): Observable<IComment[]> {
    return this.api.get(endpoints.comments, { params });
  }

  getPostByUser(id: number): Observable<IPost[]> {
    return this.api.get(`${endpoints.comments}?userId=${id}`);
  }
}
