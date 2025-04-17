import { Component, Output, EventEmitter, output } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; // Import Router
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';



@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [RouterModule,MatSlideToggleModule,MatSidenavModule,MatListModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent {
  @Output() viewToggled = new EventEmitter<string>();

  constructor(private router: Router) {} // Inject Router

  toggleView(isChecked: boolean) {
    if (isChecked) {
      this.router.navigate(['/calculator']);
    
    } else {
      this.router.navigate(['/todo']);
   
    }
  }
}

