import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';

import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor() {

    this.subscription = this.returnObservable()
    .pipe( retry(2) )
    .subscribe( 
      number => {
        console.log("Subs: " + number);
      },
      error => {
        console.error("Error: " + error);
      },
      () => {
        console.log("Observer finished!");
      }
    );

  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  returnObservable(): Observable<any>{

    return new Observable( (observer: Subscriber<any>) => {
      
      let counter = 0;

      let interval = setInterval( () => {

        counter+=1;

        const returned = {
          value: counter
        }

        observer.next( returned );

        // if ( counter == 3 ) {
        //   clearInterval( interval );
        //   observer.complete();
        // }

        // if ( counter == 2 ) {
        //   // clearInterval( interval );
        //   observer.error("ERROR, counter is 2!");
        // }

      }, 1000);

    }).pipe(
      map( resp => {
        return resp.value
      }),
      filter( ( resp, index ) => {
        // Filtro los valores para solo devolver impares
        if ( (resp % 2) ===1 ){
          return true
        } else {
          return false;
        }

      })
    );

  }

}
