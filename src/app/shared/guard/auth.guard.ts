import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,  Router } from '@angular/router';
import { TokenStorageService } from 'src/app/core/authentication/services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private token: TokenStorageService, private router: Router  ){};

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      const token = this.token.getToken();
      if (token != null) {
        return true;
      } else {
      this.router.navigate(['/login']);
      return false;
     }
    }
}
