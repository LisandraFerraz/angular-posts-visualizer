import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentService } from 'app/services/content.service';
import { SetUserService } from 'app/services/set-user.service';
import { transitionHeight } from 'app/shared/utils/animations/height.animation';
import { IUser } from 'app/shared/utils/interfaces/content-interfaces';

interface IUserSelection {
  id: number;
  name: string;
}
@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [FormsModule],
  animations: [transitionHeight],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
})
export class LoginModalComponent implements OnInit {
  constructor(
    public modal: NgbActiveModal,
    private contentService: ContentService,
    private userService: SetUserService
  ) {}

  usersList: IUserSelection[] = [];
  userSelected: IUserSelection = { id: 0, name: '' };
  allUsers!: IUser[];

  isSelected = false;

  ngOnInit(): void {
    this.listAvailableUsers();
  }

  listAvailableUsers() {
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

  defineUser() {
    const activeUser: IUser | any = this.allUsers.find(
      (user) => user.id === Number(this.userSelected.id)
    );

    this.userService.setActiveUser(activeUser);
    this.modal.close();
  }
}
