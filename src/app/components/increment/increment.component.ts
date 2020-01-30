import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: []
})
export class IncrementComponent implements OnInit {

  @ViewChild('txtProgress', null) txtProgress: ElementRef;

  @Input('name') legend: string = 'Legend';
  @Input() percentage: number = 50;

  @Output() percentageChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    
  }

  onChange ( newValue: number ){

    if ( newValue >= 100){
      this.percentage = 100;
    } else if (newValue <= 0) {
      this.percentage = 0;
    } else {
      this.percentage = newValue;
    }

    this.txtProgress.nativeElement.value = this.percentage;
    this.percentageChange.emit( this.percentage );
  }

  changeValue( value:number ){

    if ( this.percentage >= 100 && value > 0 ) {
      return;
    }

    if ( this.percentage <= 0 && value < 0) {
      return;
    }

    this.percentage += value;

    this.percentageChange.emit( this.percentage );

    this.txtProgress.nativeElement.focus();
  }
}
