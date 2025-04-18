import { ContentService } from 'app/services/content.service';
import { Component, OnInit } from '@angular/core';
import {
  IUser,
  IUserSelection,
} from 'app/shared/utils/interfaces/content-interfaces';
import { FormsModule } from '@angular/forms';
import { transitionHeight } from 'app/shared/utils/animations/height.animation';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchServiceService } from 'app/services/search-service.service';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [FormsModule],
  animations: [transitionHeight],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.scss',
})
export class SearchModalComponent implements OnInit {
  constructor(
    private contentService: ContentService,
    private router: Router,
    private modal: NgbActiveModal,
    private searchServiceService: SearchServiceService
  ) {}

  usersList: IUserSelection[] = [];
  allUsers!: IUser[];

  authorSelected: number = 0;

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.contentService.getAllUsers().subscribe({
      next: (res) => {
        this.allUsers = res;
        const users = res;

        this.usersList = users.map((user) => {
          return { id: user.id, name: user.name };
        });
      },
      error: (err) => {
        console.error('Não foi possível listar os usuários ', err);
      },
    });
  }

  searchUser() {
    this.searchServiceService.searchUser({ userId: this.authorSelected });

    this.router.navigate(['/home']);
    this.modal.close();
  }
}
