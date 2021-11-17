import {Component, ComponentFactoryResolver, Input, OnInit, Type, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicComponentDirective } from '../directives/dynamic-component.directive';
import { formConfig } from '../models/form-config';
import {
  formControlConfigurationsType,
  IFormCategoryConfig,
  IFormControlConfigurations
} from '../interfaces/form.interfaces';

@Component({
  selector: 'dynamic-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css']
})
export class FormContainerComponent implements OnInit {
  @ViewChild(DynamicComponentDirective, {static: true}) dynamicComponentDirective!: DynamicComponentDirective;
  @Input() group!: FormGroup;
  @Input() routePath!: string;
  configFromPath?: IFormCategoryConfig;
  controlComponentsNames: string[] = []; // name of controlComponents to load
  components: formControlConfigurationsType[] = [] as formControlConfigurationsType[];

  constructor(private fb: FormBuilder, private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    // Acquire the proper configuration from the path.
    this.configFromPath = this.getFormConfigFromPath();
    console.log('formConfig: ', this.configFromPath);
    this.setControlComponentNames();  // for extracting controls
    this.components = this.configFromPath.formControlsConfig;
    console.log(this.components);
    this.group = this.createFormGroup();
    this.loadFormControlComponents();
  }

  /**
   * @description Gets the configuration that includes ALL controls for the category path.
   * Path is synonymous with category.
   * @example {
    "forPath": "buysell",
    "formControls": [
        {
            "title": {
                "name": "title",
                "usesMatFormField": true,
                "label": "Title",
                "type": "text",
                "validators": [
                    null,
                    null,
                    null
                ],
                "errorConfigs": {
                    "minLength": 5,
                    "maxLength": 20
                },
                "errorMessages": [
                    {
                        "errName": "required",
                        "errMsg": "The title is required."
                    },
                    {
                        "errName": "minLength",
                        "errMsg": "Please enter a minimum of 5 characters"
                    }
                ]
            }
        },
        {
            "description": {
                "name": "description",
                "usesMatFormField": false,
                "label": "Description",
                "type": "textarea",
                "validators": [
                    null,
                    null
                ]
            }
        }
    ]
  }
   */
  getFormConfigFromPath(): IFormCategoryConfig {
    return formConfig.filter((fc: { forPath: string; }) => fc.forPath == this.routePath)
      .reduce((arr: IFormCategoryConfig) => {
        return arr;
      });
  }

  /**
   * @description Loads the appropriate component with its relevant data.
   */
  loadFormControlComponents(): void {
    const viewContainerRef = this.dynamicComponentDirective.viewContainerRef;
    this.components.forEach((frmCtrlConfiguration: formControlConfigurationsType) => {
      Object.keys(frmCtrlConfiguration).forEach((key: string) => {
        const component: Component = frmCtrlConfiguration[key].associatedComponent as Component;
        if (component) {
          const componentFactory = this.resolver.resolveComponentFactory(component as Type<Component>);
          const componentRef = viewContainerRef.createComponent<any>(componentFactory);
          componentRef.instance.config = frmCtrlConfiguration[key];
          componentRef.instance.group = this.group;
          this.group.controls[key].setValidators(frmCtrlConfiguration[key].validators);
        }
      })
    });
  }

  /**
   * @description Acquires the names of the components that contain the controls
   */
  setControlComponentNames(): void {
    this.configFromPath?.formControlsConfig
      .forEach((frmCtrlConfig: {[ctrlName: string]: IFormControlConfigurations}) => {
        Object.keys(frmCtrlConfig).forEach(k => this.controlComponentsNames.push(k));
      });
  }

  /**
   *  @description Creates the form group.  Control names MUST be acquired first as they are bound to this component.
   *  @todo Might add arguments to make this method less coupled to component? That way, it could be put into a service for forms.
   */
  createFormGroup(): FormGroup {
    const group = this.fb.group({});
    this.controlComponentsNames.forEach((controlName: string) => {
      group.addControl(controlName, this.fb.control(null));
    })
    return group;
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    // this.submit.emit(this.value);
  }

  ngOnDestroy(): void {}
}
