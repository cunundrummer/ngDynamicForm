import { Component, ComponentFactoryResolver, Input, OnInit, Type, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  descriptionControlConfiguration,
  formConfig,
  IFormCategoryConfig, IFormControlConfigurations,
  titleControlConfiguration
} from '../../models/form';
import { TitleComponent } from '../form-components/title/title.component';
import { DynamicComponentDirective } from '../../directives/dynamic-component.directive';
import { DescriptionComponent } from '../form-components/description/description.component';

interface IComponentConfigAssociaton {
  [str: string]: {
    component: Component
    config: IFormControlConfigurations
  }
}

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css']
})
export class FormContainerComponent implements OnInit {
  @ViewChild(DynamicComponentDirective, {static: true}) dynamicComponentDirective!: DynamicComponentDirective;
  @Input() group!: FormGroup;
  @Input() routePath!: string;
  configFromPath: any;
  controlComponents: string[] = []; // name of controlComponents to load
  components = [] as any[];
  compConfig: any;

  constructor(private fb: FormBuilder, private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.configFromPath = this.getFormConfigFromPath();
    console.log('formConfig: ', this.configFromPath);
    this.setControlComponentNames();
    this.group = this.createFormGroup();
    this.loadFormControlComponents();
  }

  getFormConfigFromPath() {
    return formConfig.filter(fc => fc.forPath == this.routePath)
      .reduce((arr: IFormCategoryConfig) => {
        return arr;
      });
  }

  loadFormControlComponents() {
    /** STEP 1:
     * associate name with component
    */
    const association: IComponentConfigAssociaton[] = [
      {
        'title': {
          component: TitleComponent as Component,
          config: titleControlConfiguration
        }
      },
      {
        'description': {
          component: DescriptionComponent as Component,
          config: descriptionControlConfiguration
        }
      }
    ];

    const viewContainerRef = this.dynamicComponentDirective.viewContainerRef;
    association.forEach((associate: IComponentConfigAssociaton) => {
      Object.keys(associate).forEach((key: string) => {
        const componentFactory = this.resolver.resolveComponentFactory<Component>(associate[key].component as Type<Component>);
        const componentRef = viewContainerRef.createComponent<any>(componentFactory);
        componentRef.instance.config = associate[key].config;
        componentRef.instance.group = this.group;
      })
    });
  }

  /**
   * Acquires the names of the components that contain the controls
   */
  setControlComponentNames() {
    const controls: any = [];
    let ctrlNames: any[] = [];
    this.configFromPath.formControls.forEach((ctrl: any) => {
      controls.push(ctrl);
      Object.keys(ctrl).forEach(k => ctrlNames.push(k));
    });
    console.log('Extracted controls: ', controls);
    console.log('Control names: ', ctrlNames);
    this.controlComponents = ctrlNames;
  }

  createFormGroup() {
    const group = this.fb.group({});
    this.controlComponents.forEach((controlName: string) => {
      group.addControl(controlName, this.fb.control(null));
    })
    return group;
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    // this.submit.emit(this.value);
  }

  ngOnDestroy() {}
}
