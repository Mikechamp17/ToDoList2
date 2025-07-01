// src/app/app.component.ts
import { Component, ViewChild } from '@angular/core'; // Add ViewChild
import { RouterOutlet, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Important for ngIf, ngFor etc.

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar'; // For the top toolbar
import { MatButtonModule } from '@angular/material/button'; // For buttons (e.g., menu toggle)
import { MatIconModule } from '@angular/material/icon';     // For icons (e.g., 'menu', 'home')
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav'; // For mat-sidenav-container and mat-sidenav
import { MatListModule } from '@angular/material/list';     // For mat-nav-list and mat-list-item
  import{} from '@angular/fire'; // Import AngularFire for Firebase integration


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule, // Provides routerLink directive
    FormsModule,

    HeaderComponent,
    FooterComponent,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule, // Contains MatSidenavContainer, MatSidenav, MatSidenavContent
    MatListModule,    // Contains MatNavList, MatListItem
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Use styleUrls for consistency
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav; // Get reference to the mat-sidenav

  title = 'Mikes Tools'; // Your application title, as seen in the screenshot
  appBackgroundColor: string = 'white';
  colorToggle: boolean = false;
  buttonLabel: string = 'I am a button from child 17';

  // Handler for your footer button
  handleFooterClick() {
    this.appBackgroundColor = this.colorToggle ? 'white' : 'lightblue';
    this.colorToggle = !this.colorToggle;
    console.log('Event received from footer (child) component!');
  }

  // Helper method to close the sidenav after a navigation item is clicked
  closeSidenav() {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }
}