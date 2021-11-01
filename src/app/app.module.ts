import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './sharedModules/material.module';
import { BuyAndSellComponent } from './components/buy-and-sell/buy-and-sell.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { FormContainerComponent } from './components/forms/form-container/form-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TitleComponent } from './components/forms/form-components/title/title.component';
import { DynamicComponentDirective } from './directives/dynamic-component.directive';
import { DescriptionComponent } from './components/forms/form-components/description/description.component';
import { FormControlErrorDirective } from './directives/form-control-error.directive';
import { CustomInputDirective } from './directives/custom-input.directive';
import { BaseControlComponent } from './components/forms/form-components/base-control/base-control.component';

@NgModule({
  declarations: [
    AppComponent,
    BuyAndSellComponent,
    JobsComponent,
    FormContainerComponent,
    TitleComponent,
    DescriptionComponent,
    FormControlErrorDirective,
    DynamicComponentDirective,
    CustomInputDirective,
    BaseControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
