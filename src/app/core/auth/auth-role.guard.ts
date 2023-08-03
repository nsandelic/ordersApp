import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import {JwtService} from "../jwt/jwt.service";

@Injectable({
  providedIn: 'root'
})
export class AuthRoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private jwtService: JwtService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const expectedRoles = route.data['expectedRoles'];
    console.log("expected role for /" + route.url + ' is ' + expectedRoles);
    // Get user data from session
    const userData: any = this.jwtService.getUser();
    if (userData.role != undefined) {
      console.log("User role is", userData.role);
    } else {
      console.log("User not found");
    }

    return !(!this.authService.isLoggedIn() || !expectedRoles.includes(userData.role));
  }

}

