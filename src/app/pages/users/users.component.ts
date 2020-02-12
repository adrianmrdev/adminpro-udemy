import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

declare var swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  from: number = 0;
  totalUsers: number = 0;
  loading: boolean = true;

  constructor(
    public _userService: UserService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.loadUsers();
    this._modalUploadService.notification.subscribe( resp => {
      this.loadUsers();
    })
  }

  loadUsers(){
    this.loading = true;
    this._userService.loadUsers( this.from ).subscribe( (resp: any) =>{
      this.users = resp.users;
      this.totalUsers = resp.total;
      this.loading = false;
    });

  }

  changeFrom( value: number ){
    let from = this.from + value;

    if( from >= this.totalUsers ){
      return;
    }

    if ( from < 0 ){
      return;
    }

    this.from += value;
    this.loadUsers();
  }

  searchUser( term: string ){
    if ( term.length <= 0 ){
      this.loadUsers();
      return;
    }

    this.loading = true;
    this._userService.searchUsers(term).subscribe( ( users: User[] ) => {
      this.users = users;
      this.loading = false;
    })
  }

  deleteUser(user: User){

    if ( user._id === this._userService.user._id ){
      Swal.fire('Can\'t delete user', 'You can not delete yourself', 'error');
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: 'Once deleted, you will not be able to recover '+ user.name +' information!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    })
    .then( (willDelete) => {
      if ( willDelete.value ) {
        this._userService.deleteUser( user._id )
                    .subscribe( deleted =>{
                      console.log( deleted );
                      this.loadUsers();
                    });
      }
    });

  }

  saveUser( user ){
    this._userService.updateUser( user )
        .subscribe();
  }

  showModal( id: string){
    this._modalUploadService.showModal('users', id);
  }

}
