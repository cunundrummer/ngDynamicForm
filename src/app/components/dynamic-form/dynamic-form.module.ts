import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../sharedModules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormRoutingModule } from './dynamic-form-routing.module';

import { FormControlErrorDirective } from './directives/form-control-error.directive';
import { DynamicComponentDirective } from './directives/dynamic-component.directive';
import { CustomInputDirective } from './directives/custom-input.directive';

import { FormContainerComponent } from './form-container/form-container.component';
import { TitleComponent } from './form-components/title/title.component';
import { DescriptionComponent } from './form-components/description/description.component';
import { BaseControlComponent } from './form-components/base-control/base-control.component';
import { TopFormContainerComponent } from './top-form-container/top-form-container.component';


@NgModule({
  declarations: [
    FormControlErrorDirective,
    DynamicComponentDirective,
    CustomInputDirective,
    FormContainerComponent,
    TitleComponent,
    DescriptionComponent,
    BaseControlComponent,
    TopFormContainerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DynamicFormRoutingModule
  ]
})
export class DynamicFormModule { }
