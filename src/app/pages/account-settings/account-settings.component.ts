import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _settings: SettingsService ) { }

  ngOnInit() {
    this.showCheck();
  }

  changeColor(theme: string, link: any){
    this.applyCheck(link);
    this._settings.applyTheme(theme);
  }

  applyCheck(link: any){
    let selectores: any = document.getElementsByClassName('selector');

    for( let ref of selectores) {
      ref.classList.remove('working');
    }

    link.classList.add('working');

  }

  showCheck(){
    let selectores: any = document.getElementsByClassName('selector');

    for( let ref of selectores) {
      if( this._settings.settings.theme == ref.getAttribute('data-theme') ){
        ref.classList.add("working");
        break;
      }
    }
  }
}
