import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../../config/config';

import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.loadUserStorage();
  }

  isLogged() {
    return ( this.token.length > 5 );
  }

  loadUserStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  saveUserStorage( id: string, token: string, user: User){
    
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;

  }

  loginGoogle( token: string ){
    let url = URL_API + '/login/google';

    return this.http.post(url, { token })
      .pipe(map( (resp: any) => {
        
        this.saveUserStorage( resp.id, resp.token, resp.user);

        return true;
      }));
  }

  login(user: User, remember: boolean = false) {

    if ( remember ){
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_API + "/login";
    return this.http.post( url, user)
      .pipe(map( (resp: any) => {

        this.saveUserStorage( resp.id, resp.token, resp.user);

        return true;
      }));
  }

  logout() {
    this.user = null;
    this.token = null;

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }

  createUser( user: User ){
    let url = URL_API + '/user';

    return this.http.post( url, user )
      .pipe(map( (resp: any) => {
        swal('User created', user.email, 'success');
        return resp.user;
      }));

  }

}
