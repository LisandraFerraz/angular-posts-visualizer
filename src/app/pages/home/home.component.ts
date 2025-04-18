import { Component, OnInit } from '@angular/core';
import { ContentService } from 'app/services/content.service';
import { PostCardComponent } from 'app/shared/components/post-card/post-card.component';
import { IPostsDisplay } from 'app/shared/utils/interfaces/content-interfaces';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SlicePipe } from '@angular/common';
import { LoadDataService } from 'app/services/load-data.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostCardComponent, NgbPaginationModule, SlicePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private loadDataService: LoadDataService) {}

  postsList: IPostsDisplay[] = [];

  page: number = 1;
  pageSize: number = 5;

  ngOnInit(): void {
    this.getUsernPost();
  }

  getUsernPost() {
    this.loadDataService.getAllPostObjects().subscribe({
      next: (res) => {
        this.postsList = res;
      },
    });
  }
}
