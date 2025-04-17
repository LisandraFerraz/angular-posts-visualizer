import { Injectable } from '@angular/core';
import { ApiCoreService } from 'core/api-core.service';
import { endpoints } from 'core/endepoint';

@Injectable({
  providedIn: 'root',
})
export class ContentServiceService {
  constructor(private api: ApiCoreService) {}

  getAllPosts(params: {}) {
    return this.api.get(endpoints.posts);
  }
}
