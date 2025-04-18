import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchServiceService {
  private searchTerm = new BehaviorSubject<any>({});
  searchTerm$ = this.searchTerm.asObservable();

  searchUser(param: {}) {
    this.searchTerm.next(param);
  }
}
