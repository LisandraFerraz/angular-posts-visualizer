import { Injectable, signal } from '@angular/core';
import { Post } from 'app/shared/utils/classes/post-class';
import { IPost } from 'app/shared/utils/interfaces/content-interfaces';
import { ApiCoreService } from 'core/api-core.service';
import { endpoints } from 'core/endepoint';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReplyService {
  constructor(private api: ApiCoreService) {}

  private replyResponse = new BehaviorSubject<IPost | any>(null);
  replyResTest$ = this.replyResponse.asObservable();

  sendPost(body: Post, id: number) {
    this.api.post(`${endpoints.comments}?postId=${id}`, body).subscribe({
      next: (res) => {
        this.replyResponse.next(res);
      },
      error: (err) => {
        console.error('Erro ao postar o comentário | ', err);
      },
    });
  }
}
