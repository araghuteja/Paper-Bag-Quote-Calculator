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

  Math: any;
  Constructor() {
      this.Math = Math;
  }

  ngOnInit() {
    this.Math = Math;
  }

  getSheetSize() {
    return this.getSheetLength() + ' x ' + this.getSheetWidth();
  }

  getSheetLength(): number {
    return ( this.bagDimensionsForm.value.height 
      + (3 / 4 * this.bagDimensionsForm.value.bottom)
      + this.bagDimensionsForm.value.lip );
  }

  getSheetWidth(): number {
    return (2 * this.bagDimensionsForm.value.width + 2 * this.bagDimensionsForm.value.bottom);
  }

  getWeightPerSheet(): number{
    return this.getSheetLength() * this.getSheetWidth() / 10000 * this.bagDimensionsForm.value.paperThickness;
  }

  getNumberOfSheetPerKg(): number {
    return this.getWeightPerSheet() ? 1000 / this.getWeightPerSheet() : 0;
  }

  getCostPerUnit(): number {
    return this.getNumberOfSheetPerKg() ? this.bagDimensionsForm.value.ratePerKilo / this.getNumberOfSheetPerKg() : 0;
  }

  getRatePerUnit(): number {
    return  this.getCostPerUnit() ? 1.08 * (this.getCostPerUnit() + this.bagDimensionsForm.value.costToPrint + 3.19) : 0;
  }

  getSheetSellingPrice() {
    return this.getCostPerUnit() ? (1 + (this.bagDimensionsForm.value.margin / 100)) * this.getRatePerUnit() : 0;
  }
}
