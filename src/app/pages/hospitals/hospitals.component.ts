import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {

  hospitals: Hospital[] = [];
  from: number = 0;
  totalHospitals: number = 0;
  loading: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.loadHospitals();
    this._modalUploadService.notification.subscribe( resp => {
      this.loadHospitals();
    })
  }

  loadHospitals(){
    this.loading = true;
    this._hospitalService.loadHospitals( this.from ).subscribe( (resp: any) =>{
      this.hospitals = resp.hospitals;
      this.totalHospitals = resp.total;
      this.loading = false;
    });

  }

  changeFrom( value: number ){
    let from = this.from + value;

    if( from >= this.totalHospitals ){
      return;
    }

    if ( from < 0 ){
      return;
    }

    this.from += value;
    this.loadHospitals();
  }

  searchHospital( term: string ){
    if ( term.length <= 0 ){
      this.loadHospitals();
      return;
    }

    this.loading = true;
    this._hospitalService.searchHospitals(term).subscribe( ( hospitals: Hospital[] ) => {
      this.hospitals = hospitals;
      this.loading = false;
    })
  }

  deleteHospital(hospital: Hospital){

    swal({
      title: "Are you sure?",
      text: 'Once deleted, you will not be able to recover '+ hospital.name +' information!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( (willDelete) => {
      if ( willDelete) {
        this._hospitalService.deleteHospital( hospital._id )
                    .subscribe( deleted =>{
                      console.log( deleted );
                      this.loadHospitals();
                    });
      }
    });

  }

  saveHospital( hospital ){
    this._hospitalService.updateHospital( hospital )
        .subscribe();
  }

  showModal( id: string){
    this._modalUploadService.showModal('hospitals', id);
  }

  createHospital(){
    swal({
      title: "New Hospital",
      text: "Write hospital name:",
      content: "input",
      button: {
        text: "Create",
        closeModal: false,
      },
    }).then( ( name ) => {
        if ( !name ) throw null;
        
        let hospital = new Hospital( name );

        return this._hospitalService.createHospital( hospital );
        
    }).then( (newHospitalObs) => {
      newHospitalObs.subscribe( res => this.loadHospitals() );
    }).catch( err => {
      if (err) {
        swal("Oh noes!", "Hospital creation failed!", "error");
      } else {
        swal.stopLoading();
        swal.close();
      }
    });
  }

}
