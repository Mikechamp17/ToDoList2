import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, FormsModule, HeaderComponent, RouterModule, MatSidenavModule, MatIconModule, MatButtonModule], // Add TodoListComponent and FormsModule to imports

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
}
