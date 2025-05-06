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
  currentInput: string = '0'; //stores the number currently being entered
  firstOperand : number | null = null;// stores first number when a operator is being pressed 
  operator: string | null = null; /// stores the (+ - / *)
  waitForSecondNumber: boolean = false; // A flag to know if the next digit press should start a new number
  lastOperator: string = ''; // = sign 
  

  inputDigit(digit: string): void {
    // Check if we were waiting for a new number (after an operator was pressed)
    if (this.waitForSecondNumber) {
      this.currentInput = digit; // Start the new number
      this.waitForSecondNumber = false; 
    } else {
      this.currentInput = this.currentInput === '0' ? digit : this.currentInput + digit;
    }
  }

  handleOperator(op: string): void {
    const value = parseFloat(this.currentInput); // Convert display string to a number

    // Store the first number if it hasn't been stored yet
    if (this.firstOperand === null) {
      this.firstOperand = value;
      this.lastOperator = op; //----
    }
   

    this.operator = op; // Store the operator that was pressed
    this.waitForSecondNumber = true; 
  }
 
handleEquals(): void {
  // Only proceed if we have a first number and an operator stored
  this.lastOperator = "="
  if (this.operator === null || this.firstOperand === null) {
    return; // Do nothing if we don't have a complete operation pending
  } 
  
  


  const secondOperand = parseFloat(this.currentInput); // Get the second number
  let result: number | null = null; // Variable to store the calculation result

  // Perform calculation based on the stored operator
  switch (this.operator) {
    case '+':
      result = this.firstOperand + secondOperand;
      break;
    case '-':
      result = this.firstOperand - secondOperand;
      break;
    case '*':
      result = this.firstOperand * secondOperand;
      break;
    case '/':
      if (secondOperand === 0) {
        // Handle division by zero
        this.currentInput = 'Error'; // Show error on display
        this.operator = null; // Reset operator
        this.firstOperand = null; // Reset first operand
        this.waitForSecondNumber = false; // Reset flag
        return; // Stop further processing
      }
      result = this.firstOperand / secondOperand;
      break;
    default:
      return;
    }
  // Update the display and reset state for the next calculation
  this.currentInput = String(result); // Disply the result
  this.operator = null; // Clear the operator
  this.firstOperand = null; // Clear the first operand for basic calculation flow)
  this.waitForSecondNumber = false; // Reset the flag
}



clear(): void {
  this.currentInput = '0';
  this.firstOperand = null,
  this.operator = null;
  this.waitForSecondNumber = false;
 
  



}

}


