import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UserService } from '../user/user.service';
import { Doctor } from 'src/app/models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    public http: HttpClient,
    public _userService: UserService
  ) { }

  loadDoctors(from: number = 0){
    let url = URL_API + '/doctor?from=' + from;
    return this.http.get(url);
  }

  loadDoctor( id: string ){
    let url = URL_API + '/doctor/' + id;
    return this.http.get(url)
        .pipe( map ( (resp: any ) => {
          return resp.doctor;
        }))
  }

  searchDoctor( term: string ){
    let url = URL_API + '/search/collection/doctors/' + term;
    return this.http.get(url)
      .pipe(map ((resp: any) => resp.doctors ));
  }

  deleteDoctor( id: string){
    let url = URL_API + '/doctor/' + id;
    url += '?token=' + this._userService.token;

    return this.http.delete( url )
      .pipe(map ((resp: any) => {
        Swal.fire('Doctor deleted', 'Doctor deleted correctly', 'success');
      } ));
  }

  saveDoctor( doctor: Doctor ){

    let url = URL_API + '/doctor';

    if ( !doctor._id ){

      url += '?token=' + this._userService.token;

      return this.http.post( url, doctor )
          .pipe(map( (resp: any) => {
              Swal.fire('Doctor created', doctor.name, 'success');
              return resp.doctor;
          }));

    } else {

      url += "/" + doctor._id;
      url += '?token=' + this._userService.token;

      return this.http.put( url, doctor )
          .pipe(map( (resp: any) => {
              Swal.fire('Doctor updated', doctor.name, 'success');
              return resp.doctor;
          }));

    }

   
  }
}
