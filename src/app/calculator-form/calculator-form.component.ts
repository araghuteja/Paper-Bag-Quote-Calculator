import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-calculator-form',
  templateUrl: './calculator-form.component.html',
  styleUrls: ['./calculator-form.component.css']
})
export class CalculatorFormComponent implements OnInit {

  bagDimensionsForm = new FormGroup({
    height: new FormControl(''),
    width: new FormControl(''),
    bottom: new FormControl(''),
    lip: new FormControl(''),
    paperThickness: new FormControl(''),
    ratePerKilo: new FormControl(''),
    costToPrint: new FormControl(''),
    margin: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }

  getSheetSize() {
    return ( this.bagDimensionsForm.value.height 
              + (3 / 4 * this.bagDimensionsForm.value.bottom)
              + this.bagDimensionsForm.value.lip )
            * (2 * this.bagDimensionsForm.value.width + 2 * this.bagDimensionsForm.value.bottom) ;
  }

}
