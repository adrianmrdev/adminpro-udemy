import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public type: string;
  public id: string;

  public hide: string = 'hide';

  public notification = new EventEmitter<any>();

  constructor() {
    console.log("Modal upload ready");
  }

  hideModal(){
    this.hide = 'hide';
    this.id = null;
    this.type = null;
  }

  showModal( type: string, id: string){
    this.hide = '';
    this.id = id;
    this.type = type;
  }
}
