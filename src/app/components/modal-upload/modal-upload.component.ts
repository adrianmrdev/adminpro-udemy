import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UploadFileService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  uploadedImg: File;
  tmpImg: string;

  constructor(
    public _uploadFileService: UploadFileService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
  }

  imgSelection( file ){
    
    if ( !file ){
      this.uploadedImg = null;
      return;
    }

    if ( file.type.indexOf('image') < 0){
      Swal.fire('Only images', 'Selected file is not an image', 'error');
      this.uploadedImg = null;
      return;
    }

    this.uploadedImg = file;

    let reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => this.tmpImg = reader.result.toString();

  }

  uploadImg(){
    this._uploadFileService.uploadFile( this.uploadedImg, this._modalUploadService.type, this._modalUploadService.id)
        .then( resp => {
          this._modalUploadService.notification.emit( resp );
          this.hideModal();
        })
        .catch( err => {
          console.log("Error uploading image: " + err);
        });
  }

  hideModal(){
    this.uploadedImg = null;
    this.tmpImg = null;
    this._modalUploadService.hideModal();
  }

}
