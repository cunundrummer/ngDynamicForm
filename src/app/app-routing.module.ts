import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyAndSellComponent } from './components/buy-and-sell/buy-and-sell.component';
import { JobsComponent } from './components/jobs/jobs.component';

const routes: Routes = [
  {
    path: 'buysell',
    component: BuyAndSellComponent
  },
  {
    path: 'jobs',
    component: JobsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
