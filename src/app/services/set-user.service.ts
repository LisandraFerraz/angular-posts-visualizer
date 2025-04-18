import { IUser } from 'app/shared/utils/interfaces/content-interfaces';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from 'app/shared/utils/classes/post-class';

@Injectable({
  providedIn: 'root',
})
export class SetUserService {
  constructor() {}

  private activeUserLocal = new BehaviorSubject<User | null>(
    this.loadSavedUser()!
  );
  activeUser$ = this.activeUserLocal.asObservable();

  setActiveUser(user: User) {
    localStorage.setItem('@activeUser', JSON.stringify(user));
    this.activeUserLocal.next(user);
  }

  loadSavedUser(): User | null {
    try {
      const savedData = localStorage.getItem('@activeUser') || '';
      return JSON.parse(savedData);
    } catch (error) {
      return null;
    }
  }

  cleanData() {
    localStorage.removeItem('@activeUser');
    this.activeUserLocal.next(null);
  }
}
