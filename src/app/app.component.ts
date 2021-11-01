import { Component } from '@angular/core';
import { categoryRoutes } from './models/category-routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly categoryData = categoryRoutes;
}
