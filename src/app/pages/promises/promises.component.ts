import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {

    this.count3().then( (message) => {
      console.log("Finished: " + message);
    })
    .catch( error => {
      console.error('Error en la promesa: ' + error);
    })

  }

  ngOnInit() {
  }

  count3(): Promise<string>{
    return new Promise<string>( (resolve, reject) => {

      let counter = 0;

      let interval = setInterval( () => {
        
        counter+=1;
        console.log(counter);

        if(counter == 3){
          resolve("OK!");
          //reject('An error ocurred');
          clearInterval(interval)
        }

      }, 1000);

    });
  }

}
