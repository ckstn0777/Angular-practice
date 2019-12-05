import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth-service";

export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // authService에 isAuthenticated를 통해 프라미스를 받고, true면 return true. 아니면 메인화면으로 이동후 return false
    return this.authService.isAuthenticated()
      .then((authenticated: boolean) => {
        console.log(authenticated);
        if (authenticated) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      });
  }

  // child인 path 경로에 해당.
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
