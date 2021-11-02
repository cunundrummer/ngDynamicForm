import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './sharedModules/material.module';
import { FormContainerComponent } from './components/forms/form-container/form-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TitleComponent } from './components/forms/form-components/title/title.component';
import { DynamicComponentDirective } from './directives/dynamic-component.directive';
import { DescriptionComponent } from './components/forms/form-components/description/description.component';
import { FormControlErrorDirective } from './directives/form-control-error.directive';
import { CustomInputDirective } from './directives/custom-input.directive';
import { BaseControlComponent } from './components/forms/form-components/base-control/base-control.component';
import { CategoryContainerComponent } from './components/category-container/category-container.component';

@NgModule({
  declarations: [
    AppComponent,
    FormContainerComponent,
    TitleComponent,
    DescriptionComponent,
    FormControlErrorDirective,
    DynamicComponentDirective,
    CustomInputDirective,
    BaseControlComponent,
    CategoryContainerComponent
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
