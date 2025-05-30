import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SetUserService } from 'app/services/set-user.service';
import { User } from 'app/shared/utils/classes/post-class';
import { SearchModalComponent } from '../search-modal/search-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(
    private userService: SetUserService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  activeUser = signal<User>(new User());

  ngOnInit(): void {
    this.userService.activeUser$.subscribe((user) => {
      if (user) this.activeUser.set(user);
    });
  }

  navigateTo() {
    this.router.navigate([`/`]);
  }

  logout() {
    this.router.navigate([`/`]);
    this.userService.cleanData();
  }

  searchPost() {
    this.modalService.open(SearchModalComponent, {
      centered: true,
    });
  }

  goToProfile() {
    this.router.navigate([`/profile/${this.activeUser().id}`]);
  }
}
