import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/service.index';
import { Doctor } from 'src/app/models/doctor.model';

declare var swal: any;

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {

  loading: boolean = true;
  from: number = 0;
  doctors: Doctor[] = [];
  totalDoctors: number = 0;

  constructor(
    public _doctorService: DoctorService
  ) { }

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors(){
    this.loading = true;
    this._doctorService.loadDoctors( this.from ).subscribe( (resp: any) =>{
      this.doctors = resp.doctors;
      this.totalDoctors = resp.total;
      this.loading = false;
    });

  }

  changeFrom( value: number ){
    let from = this.from + value;

    if( from >= this.totalDoctors ){
      return;
    }

    if ( from < 0 ){
      return;
    }

    this.from += value;
    this.loadDoctors();
  }

  searchDoctor( term: string ){
    if ( term.length <= 0 ){
      this.loadDoctors();
      return;
    }

    this.loading = true;
    this._doctorService.searchDoctor(term).subscribe( ( doctors: Doctor[] ) => {
      this.doctors = doctors;
      this.loading = false;
    })
  }

  deleteDoctor(doctor: Doctor){

    swal({
      title: "Are you sure?",
      text: 'Once deleted, you will not be able to recover '+ doctor.name +' information!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( (willDelete) => {
      if ( willDelete) {
        this._doctorService.deleteDoctor( doctor._id )
                    .subscribe( deleted =>{
                      console.log( deleted );
                      this.loadDoctors();
                    });
      }
    });

  }

}
