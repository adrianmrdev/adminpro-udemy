import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../../config/config';

import { map, catchError } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UploadFileService } from '../uploadFile/upload-file.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;
  menu: any = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadFileService: UploadFileService
  ) {
    this.loadUserStorage();
  }

  renewToken(){
    let url = URL_API + '/login/renewtoken/';
    url += '?token=' + this.token;

    return this.http.get( url )
              .pipe( map( (resp: any) => {
                  this.token = resp.token;
                  localStorage.setItem('token', this.token);

                  return true;
                }),
                catchError( err => {
                  this.router.navigate(['/login']);
                  Swal.fire( 'Token renewal failed', 'Could not renew token', 'error' )
                  return throwError( err );
                })
              );
  }

  isLogged() {
    return ( this.token.length > 5 );
  }

  loadUserStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.user = null;
      this.menu = [];
    }
  }

  saveUserStorage( id: string, token: string, user: User, menu: any){
    
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.user = user;
    this.token = token;
    this.menu = menu;

  }

  loginGoogle( token: string ){
    let url = URL_API + '/login/google';

    return this.http.post(url, { token })
      .pipe(map( (resp: any) => {
        
        this.saveUserStorage( resp.id, resp.token, resp.user, resp.menu);

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
      .pipe( map( (resp: any) => {
          this.saveUserStorage( resp.id, resp.token, resp.user, resp.menu);
          return true;
        }),
        catchError( err => {
          Swal.fire( 'Error on login', err.error.message, 'error' );
          return throwError( err );
        })
      )
      
  }

  logout() {
    this.user = null;
    this.token = null;

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  createUser( user: User ){
    let url = URL_API + '/user';

    return this.http.post( url, user )
      .pipe(map( (resp: any) => {
          Swal.fire('User created', user.email, 'success');
          return resp.user;
        }),
        catchError( err => {
          Swal.fire( err.error.message, err.error.errors.message, 'error' );
          return throwError( err );
        })
      );

  }

  updateUser( user: User ){

    let url = URL_API + '/user/' + user._id;
    url += '?token=' + this.token;

    return this.http.put( url, user )
    .pipe(map( (resp: any) => {

        if ( user._id === this.user._id) {
          this.saveUserStorage( resp.user._id, this.token, resp.user, this.menu);
        }

        Swal.fire('User updated', user.email, 'success');

        return user;

      }),
      catchError( err => {
        Swal.fire( err.error.message, err.error.errors.message, 'error' );
        return throwError( err );
      })
    );

  }

  changeImg( file: File, id: string){

    this._uploadFileService.uploadFile( file, 'users', id)
          .then( (resp: any) =>{
            this.user.img = resp.user.img;
            Swal.fire( 'Image updated', this.user.name, 'success');

            this.saveUserStorage( id, this.token, this.user, this.menu);
            
          })
          .catch( (error: any) => {
            console.log( error );
          })

  }

  loadUsers( from: number = 0){
    let url = URL_API + '/user?from=' + from;
    return this.http.get(url);
  }

  searchUsers( term: string ){
    let url = URL_API + '/search/collection/users/' + term;
    return this.http.get(url)
      .pipe(map ((resp: any) => resp.users ));
  }

  deleteUser( id: string){
    let url = URL_API + '/user/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url )
      .pipe(map ((resp: any) => {
        Swal.fire('User deleted', 'User deleted correctly', 'success');
      } ));
  }

}
