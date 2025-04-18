import { Component, OnInit } from '@angular/core';
import { PostCardComponent } from 'app/shared/components/post-card/post-card.component';
import { IPostsDisplay } from 'app/shared/utils/interfaces/content-interfaces';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadDataService } from 'app/services/load-data.service';
import { SearchServiceService } from 'app/services/search-service.service';
import { switchMap } from 'rxjs';
import { SlicePipe } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostCardComponent, NgbPaginationModule, SlicePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private loadDataService: LoadDataService,
    private searchService: SearchServiceService
  ) {}

  postsList: IPostsDisplay[] = [];

  page: number = 1;
  pageSize: number = 5;

  ngOnInit(): void {
    this.searchService.searchTerm$
      .pipe(
        switchMap((params) => this.loadDataService.getAllPostObjects(params))
      )
      .subscribe((res) => {
        this.postsList = res;
      });
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
