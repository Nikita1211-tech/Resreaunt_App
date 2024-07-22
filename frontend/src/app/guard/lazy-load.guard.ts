import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class canLoadGuard implements CanLoad {

  constructor(private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    const isAuthenticated = true;
    if (isAuthenticated) {
      return true;
    }
    else {
      this.router.navigate(['landingpage']);
      return false;
    }
  }
}

