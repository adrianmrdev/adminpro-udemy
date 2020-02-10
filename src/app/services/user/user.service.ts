import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../../config/config';

import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { UploadFileService } from '../uploadFile/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadFileService: UploadFileService
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

  updateUser( user: User ){

    let url = URL_API + '/user/' + user._id;
    url += '?token=' + this.token;

    return this.http.put( url, user )
    .pipe(map( (resp: any) => {

      if ( user._id === this.user._id) {
        this.saveUserStorage( resp.user._id, this.token, resp.user);
      }

      swal('User updated', user.email, 'success');

      return user;

    }));

  }

  changeImg( file: File, id: string){

    this._uploadFileService.uploadFile( file, 'users', id)
          .then( (resp: any) =>{
            this.user.img = resp.user.img;
            swal( 'Image updated', this.user.name, 'success');

            this.saveUserStorage( id, this.token, this.user );
            
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
        swal('User deleted', 'User deleted correctly', 'success');
      } ));
  }

}
