import { Pipe, PipeTransform } from '@angular/core';
import { URL_API } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: string = 'user'): any {
    
    let url = URL_API + '/img';

    if ( !img ){
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf('https') >= 0) {
      return img;
    }

    switch( type ){

      case 'user':
        url += '/users/' + img;
        break;

      case 'hospital':
        url += '/hospitals/' + img;
        break;

      case 'doctor':
        url += '/doctors/' + img;
        break;

      default:
        console.log("Valid values: user, hospital, doctor");
        url += '/usuarios/xxx';
    
    }
   
    return url;
  }

}
