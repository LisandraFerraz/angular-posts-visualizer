import { Component, Input } from '@angular/core';
import { ContentService } from 'app/services/content.service';
import { IComment } from 'app/shared/utils/interfaces/content-interfaces';

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss',
})
export class CommentCardComponent {
  @Input() commentData!: IComment;
}
