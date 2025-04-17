import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule,RouterModule,],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent {
  num1: number = 0;
  num2: number = 0;
  result: number = 0;
  errorMessage = '';

  addNumbers() {
    this.result = this.num1 + this.num2;
  }
  minusNumbers() {
    this.result = this.num1 - this.num2;
  }

  divideNumbers() {
    if (this.num2 === 0) {
      this.result = NaN;
      this.errorMessage = 'Bro cant divide a number by 0...';
    } else {
      this.result = this.num1 / this.num2;
      this.errorMessage = '';
    }
  }

  multiplyNumber() {
    if (this.num2 === 0) {
      this.result = NaN;
      this.errorMessage = 'Bro cant Multiply a number by 0...';
    } else {
      this.result = this.num1 * this.num2;
      this.errorMessage = '';
    }
  }
  clear() {
    this.num1 = 0;
    this.num2 = 0;
    this.result = 0;
    this.errorMessage = '';
  }
}
