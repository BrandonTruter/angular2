/**
 * Created by brandon on 2016/08/20.
 */

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}


// @Directive({
//   selector: 'router-outlet'
// })
//
// export class AuthCheck extends RouterOutlet {
//   publicRoutes: any;
//   private parentRouter: Router;
//
//   constructor(_elementRef: ElementRef, _loader: DynamicComponentLoader, _parentRouter: Router,
//               @Attribute('name')nameAttr:string) {
//     super(_elementRef, _loader, _parentRouter, nameAttr);
//
//     this.parentRouter = _parentRouter;
//     this.publicRoutes = {
//       'login': true
//     };
//   }
//
//   activate(instruction: ComponentInstruction) {
//     let url = instruction.urlPath;
//
//     if(!this.publicRoutes[url] && !localStorage.getItem('auth_key')){
//       this.parentRouter.navigateByUrl('/login');
//     }
//
//     return super.activate(instruction);
//   }
// }
