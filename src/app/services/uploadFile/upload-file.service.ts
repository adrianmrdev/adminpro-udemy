import { Injectable } from '@angular/core';
import { URL_API } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  uploadFile( file: File, type: string, id: string ){

    return new Promise(( resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
  
      formData.append( 'img', file, file.name );
  
      xhr.onreadystatechange = () => {
  
        if ( xhr.readyState === 4 ){
  
          if ( xhr.status === 200 ){
            console.log("File uploaded");
            resolve( JSON.parse(xhr.response) );
          } else {
            console.log("Error uploading file");
            reject( xhr.response );
          }
  
        }
  
      }

      let url = URL_API + '/upload/' + type + '/' + id;

      xhr.open( 'PUT', url, true );
      xhr.send( formData );

    }); 

  }

}
