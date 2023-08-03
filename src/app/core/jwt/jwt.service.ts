import { Injectable } from '@angular/core';
import {LocalStorageService} from "../local-storage/local-storage.service";

export const USER_KEY: string = 'USER';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  getUser(): any {
    return this.localStorageService.getItem(USER_KEY);
  }

  destroyUser(): void {
    this.localStorageService.removeItem(USER_KEY);
  }

  public saveUser(user: any): void {
    this.localStorageService.removeItem(USER_KEY);
    this.localStorageService.setItem(USER_KEY, user);
  }
}
