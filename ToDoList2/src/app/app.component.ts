import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component'; // Import TodoListComponent
import { FormsModule } from '@angular/forms'; // Import FormsModule
//import { CalculatorComponent } from './todo-list/calculator/calculator.component'; 
//we dont need to import it here as they are being loaded via the router 
import { NgIf } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule,HeaderComponent,RouterModule,MatSlideToggleModule, NavigationBarComponent], // Add TodoListComponent and FormsModule to imports
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})



  export class AppComponent {

    //constructor(private router: Router) {}
  
        //toggleView(isChecked: boolean) {
      //if (isChecked) {
        // this.router.navigate(['/calculator']);
      //} else {
     ///   this.router.navigate(['/']);
    // }
  }
 
