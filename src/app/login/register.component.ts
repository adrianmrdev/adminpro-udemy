import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as swal from 'sweetalert';

import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    public _userService: UserService,
    public router: Router
  ) { }

  equalFields( field1: string, field2: string ){
    return ( group: FormGroup ) => {

      let pass1 = group.controls[field1].value;
      let pass2 = group.controls[field2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        equal: true
      }
    }
  }

  ngOnInit() {
    init_plugins();

    this.form = new FormGroup({
      name: new FormControl( null, Validators.required ),
      email: new FormControl( null, [Validators.required, Validators.email] ),
      password1: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      terms: new FormControl( false )
    }, { validators: this.equalFields( 'password1', 'password2' ) });

    this.form.setValue({
      name: "Adrian",
      email: "adrian@adrian.com",
      password1: "12341234",
      password2: "12341234",
      terms: false
    })
    
  }

  registerUser(){
    if ( this.form.invalid){
      return;
    }

    if ( !this.form.value.terms ){
      swal('Important', 'Should accept terms and conditions', 'warning');
      return;
    }

    let user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password1
    );

    this._userService.createUser( user ).subscribe( res => this.router.navigate(['/login']));
  }

}
