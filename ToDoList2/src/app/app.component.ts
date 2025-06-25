import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import { RouterOutlet,NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from './footer/footer.component';
import { Input } from '@angular/core';
import { ObservablesComponent } from './observables/observables.component';

@Component({
  selector: 'app-root',
  standalone: true,


  imports: [HeaderComponent,FooterComponent,RouterOutlet, FormsModule, HeaderComponent, RouterModule, MatSidenavModule, MatIconModule, MatButtonModule, MatListModule, ReactiveFormsModule, FooterComponent, ObservablesComponent], // Add TodoListComponent and FormsModule to imports

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  //constructor(private router: Router) {}
  //toggleView(isChecked: boolean) {
  //if (isChecked) {
  // this.router.navigate(['/calculator']);
  //} else {
  ///   this.router.navigate(['/']);
  // }

  buttonLabel: string = 'I am a button from child 17';
  messsageFromChild: string = 'clicked me';
// toglle background color
  appBackgroundColor: string = 'white';
  colorToggle: boolean = false;

   handleFooterClick() {
    
if (this.colorToggle){
  this.appBackgroundColor = 'white';
} else {
  this.appBackgroundColor = 'lightblue';
}
this.colorToggle = !this.colorToggle;


console.log('Event received from footer (child) component!');
}

}
