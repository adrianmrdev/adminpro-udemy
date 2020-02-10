import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  uploadedImg: File;
  tmpImg: string;

  constructor(
    public _userService: UserService
  ) {
    this.user = this._userService.user;
  }

  ngOnInit() {
    
  }

  save( user: User ){

    this.user.name = user.name;
    if ( !this.user.google ){
      this.user.email = user.email;
    }

    this._userService.updateUser( this.user ).subscribe();

  }

  imgSelection( file ){
    
    if ( !file ){
      this.uploadedImg = null;
      return;
    }

    if ( file.type.indexOf('image') < 0){
      swal('Only images', 'Selected file is not an image', 'error');
      this.uploadedImg = null;
      return;
    }

    this.uploadedImg = file;

    let reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => this.tmpImg = reader.result.toString();

  }

  changeImg(){
    this._userService.changeImg(this.uploadedImg, this.user._id);
  }

}
