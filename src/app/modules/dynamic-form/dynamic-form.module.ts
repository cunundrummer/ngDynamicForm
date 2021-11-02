import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormContainerComponent } from '../../components/forms/form-container/form-container.component';
import { TitleComponent } from '../../components/forms/form-components/title/title.component';
import { DescriptionComponent } from '../../components/forms/form-components/description/description.component';
import { FormControlErrorDirective } from '../../directives/form-control-error.directive';
import { DynamicComponentDirective } from '../../directives/dynamic-component.directive';
import { CustomInputDirective } from '../../directives/custom-input.directive';
import { BaseControlComponent } from '../../components/forms/form-components/base-control/base-control.component';
import { CategoryContainerComponent } from '../../components/category-container/category-container.component';
import { MaterialModule } from '../../sharedModules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormRoutingModule } from './dynamic-form-routing.module';


@NgModule({
  declarations: [
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
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DynamicFormRoutingModule
  ]
})
export class DynamicFormModule { }
