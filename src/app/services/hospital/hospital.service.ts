import { Injectable } from '@angular/core';
import { URL_API } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Hospital } from 'src/app/models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    public http: HttpClient,
    public _userService: UserService
  ) { }


  loadHospitals( from: number = 0){
    let url = URL_API + '/hospital?from=' + from;
    return this.http.get(url);
  }

  loadHospital( id: string){
    let url = URL_API + '/hospital/' + id;
    return this.http.get(url)
      .pipe(map( (resp: any) => {
        return resp.hospital;
      }));
  }

  createHospital( hospital: Hospital ){
    let url = URL_API + '/hospital';
    url += '?token=' + this._userService.token;

    return this.http.post( url, hospital )
      .pipe(map( (resp: any) => {
        swal('Hospital created', hospital.name, 'success');
        return resp.hospital;
      }));
  }

  updateHospital( hospital: Hospital ){

    let url = URL_API + '/hospital/' + hospital._id;
    url += '?token=' + this._userService.token;

    return this.http.put( url, hospital )
    .pipe(map( (resp: any) => {

      swal('Hospital updated', hospital.name, 'success');

      return hospital;

    }));

  }

  searchHospitals( term: string ){
    let url = URL_API + '/search/collection/hospitals/' + term;
    return this.http.get(url)
      .pipe(map ((resp: any) => resp.hospitals ));
  }

  deleteHospital( id: string){
    let url = URL_API + '/hospital/' + id;
    url += '?token=' + this._userService.token;

    return this.http.delete( url )
      .pipe(map ((resp: any) => {
        swal('Hospital deleted', 'Hospital deleted correctly', 'success');
      } ));
  }

}


