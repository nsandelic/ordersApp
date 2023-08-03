import { Component } from '@angular/core';
import {AuthService} from "./core/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoggedIn: boolean = false;
  public currentUser: { email: string, role: string, token: string } | null = null;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {

    if (this.authService.isLoggedIn()) {
      this.currentUser = this.authService.getCurrentUser();
      this.isLoggedIn = true;

    }else{
      this.logout();
    }

  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
