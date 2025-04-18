import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { LoginModalComponent } from './shared/components/login-modal/login-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SetUserService } from './services/set-user.service';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-posts-visualizer';

  constructor(public ngModal: NgbModal, private userService: SetUserService) {}

  ngOnInit(): void {
    this.userService.activeUser$.subscribe((user) => {
      if (!user || !user.id) {
        this.openModalLogin();
      }
    });
  }

  openModalLogin() {
    this.ngModal.open(LoginModalComponent, {
      centered: true,
      animation: true,
      backdrop: 'static',
    });
  }
}
