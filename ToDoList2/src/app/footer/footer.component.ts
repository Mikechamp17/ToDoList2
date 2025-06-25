import { Component,EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common'; 

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
// Iput property to rec data from parent 
@Input() buttonLabel: string = 'I am a button from child component';
// Output property to emit event to parent
@Output() buttonClicked: EventEmitter<void> = new EventEmitter<void>();

onButtonClick(){
  console.log('child button clicked, Changed the background color of parent component!');
  // Emit the event to parent component
  this.buttonClicked.emit();
}
}

