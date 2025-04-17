import { Injectable } from '@angular/core';
import { Post } from 'app/shared/utils/classes/post-class';
import { IPosts } from 'app/shared/utils/interfaces/content-interfaces';
import { ApiCoreService } from 'core/api-core.service';
import { endpoints } from 'core/endepoint';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private api: ApiCoreService) {}

  getAllPosts(params?: {}) {
    return this.api.get(endpoints.posts, { params });
  }

  getAllUsers(params?: {}) {
    return this.api.get(endpoints.users, { params });
  }

  getUser(id: number) {
    return this.api.get(`${endpoints.users}?userId=${id}`);
  }

  getAllComments(params?: {}) {
    return this.api.get(endpoints.comments, { params });
  }
}
