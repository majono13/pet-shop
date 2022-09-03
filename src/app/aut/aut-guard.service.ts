import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AutService } from './aut.service';

@Injectable({
  providedIn: 'root'
})
export class AutGuard implements CanActivate {

  constructor(private router: Router, private autService: AutService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.autService.autenticado()
      .pipe(
        tap((user) => {
          if (!user) this.router.navigateByUrl('/login');
        })
      )
  }
}
