import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivate {

  constructor(
    public _userService: UserService,
    public router: Router
  ){

  }

  canActivate(): Promise<boolean> | boolean {

    let token = this._userService.token;
    let payload = JSON.parse( atob( token.split('.')[1] ));

    let expired = this.expired( payload.exp );

    if ( expired ){
      this.router.navigate(['login']);
      return false;
    }

    return this.verifyRenew( payload.exp );

  }

  verifyRenew( expDate: number ): Promise<boolean>{

    return new Promise( (resolve, reject) => {

      let tokenExp = new Date( expDate * 1000 );
      let renewalTime = new Date();

      // One hour renewal time
      renewalTime.setTime( renewalTime.getTime() + ( 1 * 60 * 60 * 1000 ) );

      if ( tokenExp.getTime() > renewalTime.getTime() ){
        resolve ( true );
      } else {
        this._userService.renewToken()
              .subscribe( () => {
                  resolve( true );
                }, ()=> {
                  reject( false );
                  this.router.navigate(['login']);
                },
              );
      }

    });

  }

  expired( expDate: number ){

    let now = new Date().getTime() / 1000;

    if ( expDate < now ) {
      return true;
    } else {
      return false;
    }
  }

}
