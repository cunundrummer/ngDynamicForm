import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryContainerComponent } from '../../components/category-container/category-container.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryContainerComponent
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicFormRoutingModule { }
