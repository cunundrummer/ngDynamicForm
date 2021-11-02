import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryContainerComponent } from './components/category-container/category-container.component';

const routes: Routes = [
  {
    path: 'category/:categoryName',
    component: CategoryContainerComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
