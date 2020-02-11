import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService, DoctorService } from 'src/app/services/service.index';
import { Doctor } from 'src/app/models/doctor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {

  hospitals: Hospital[] = [];
  hospital: Hospital = new Hospital('');
  doctor: Doctor = new Doctor('','','','','');

  constructor(
    public _hospitalService: HospitalService,
    public _doctorService: DoctorService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {

    this.activatedRoute.params.subscribe ( params => {

      let id = params['id'];

      if ( id !== 'new' ){
        this.loadDoctor( id );
      }

    });

  }

  ngOnInit() {

    this._hospitalService.loadHospitals().subscribe( (resp: any) => {
      this.hospitals = resp.hospitals;
    });

    this._modalUploadService.notification.subscribe( resp => {
      this.doctor.img = resp.doctor.img;
    });
  }

  loadDoctor( id: string) {
    this._doctorService.loadDoctor( id )
        .subscribe( doctor => {
          this.doctor = doctor;
          this.doctor.hospital = doctor.hospital._id;
          this.changeHospital( this.doctor.hospital );
        });
  }

  saveDoctor( f: NgForm ){
    console.log(f.valid);
    console.log(f.value);

    if ( f.invalid ){
      return;
    }

    this._doctorService.saveDoctor( this.doctor )
      .subscribe( doctor =>{
        this.doctor._id = doctor._id;
        this.router.navigate(['/doctor', doctor._id]);
      });
  }

  changeHospital( id: string ){

    this._hospitalService.loadHospital( id ).subscribe( hospital => this.hospital = hospital );

  }

  changeImg(){

    this._modalUploadService.showModal('doctors', this.doctor._id);

  }

}
