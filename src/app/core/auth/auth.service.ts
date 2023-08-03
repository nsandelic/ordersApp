import { Injectable } from '@angular/core';
import {JwtService} from "../jwt/jwt.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: { email: string, password: string, role: string }[] = [
    { email: 'admin@gmail.com', password: 'Admin!', role: 'ADMIN' },
    { email: 'user@gmail.com', password: 'User!!', role: 'USER' },
  ];

  private currentUser: { email: string, role: string, token: string } | null = null;

  constructor(private jwtService: JwtService, private router: Router) {}

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = { email: user.email, role: user.role, token: 'mocked_jwt_token' };
      this.jwtService.saveUser(this.currentUser);
      return true;
    }
    return false;
  }

  logout(): void {
    if(this.jwtService.getUser() != null) {
      this.jwtService.destroyUser();
      this.currentUser = null;
      this.router.navigate(['/login']).then(() => {});
    }
  }

  getCurrentUser(): { email: string, role: string, token: string } | null {
    if(this.jwtService.getUser() != null) {
      this.currentUser = this.jwtService.getUser()
    } else
      this.currentUser = null;

    return this.currentUser;
  }


  public isLoggedIn(): boolean {
    if (this.jwtService.getUser()) {
      return true;
    } else {
      return false;
    }
  }

}
