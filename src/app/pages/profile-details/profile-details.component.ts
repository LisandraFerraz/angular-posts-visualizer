import { ContentService } from 'app/services/content.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Post, User } from 'app/shared/utils/classes/post-class';
import {
  IPost,
  IPostsDisplay,
} from 'app/shared/utils/interfaces/content-interfaces';
import { pfpList } from 'app/shared/utils/pfps';
import { PostCardComponent } from 'app/shared/components/post-card/post-card.component';
import { LoadDataService } from 'app/services/load-data.service';

@Component({
  selector: 'app-profile-details',
  standalone: true,
  imports: [PostCardComponent],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss',
})
export class ProfileDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private loadDataService: LoadDataService
  ) {}

  userPosts!: IPostsDisplay[];
  userInfo: User = new User();

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    const currentId = this.route.snapshot.params['id'];
    const random = Math.floor(Math.random() * pfpList.length);

    this.contentService.getUser(currentId).subscribe({
      next: (res) => {
        this.userInfo = {
          ...res,
          pfp: pfpList[random],
        };
        this.getUserPosts(res.id);
      },
      error: (err) => {
        console.error(
          'Não foi possível trazer as informações do usuário. ',
          err
        );
      },
    });
  }

  getUserPosts(id: number) {
    this.loadDataService.getAllPostObjects().subscribe({
      next: (res) => {
        const posts = res;

        this.userPosts = posts.filter((post) => post.userId === id);
      },
    });
  }
}
