import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopFormContainerComponent } from './top-form-container/top-form-container.component';

const routes: Routes = [
  {
    path: '',
    component: TopFormContainerComponent
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicFormRoutingModule { }
