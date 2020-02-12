import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_API } from 'src/app/config/config';
import { User } from 'src/app/models/user.model';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  users: User[] = [];
  doctors: Doctor[] = [];
  hospitals: Hospital[] = [];

  constructor(
    public activateRoute: ActivatedRoute,
    public http: HttpClient
  ) {
    activateRoute.params
        .subscribe( params => {
          let term = params['term'];
          this.search( term );
        });
  }

  ngOnInit() {
  }

  search( term: string){

    let url = URL_API + '/search/all/' + term;

    this.http.get( url ).subscribe( (resp: any) => {
      this.users = resp.users;
      this.doctors = resp.doctors;
      this.hospitals = resp.hospitals;
    });
  }

}
