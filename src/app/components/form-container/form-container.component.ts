import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { formConfig, IFormCategoryConfig } from '../../models/form';
import { DynamicComponentDirective } from '../../directives/dynamic-component.directive';

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
  controlComponentsNames: string[] = []; // name of controlComponents to load
  components = [] as any[];
  compConfig: any;

  constructor(private fb: FormBuilder, private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.configFromPath = this.getFormConfigFromPath();
    console.log('formConfig: ', this.configFromPath);
    this.setControlComponentNames();  // to extract controls
    this.components = this.configFromPath.formControls;
    console.log(this.components);
    this.group = this.createFormGroup();
    this.loadFormControlComponents();
  }

  /**
   * Gets the configuration that includes ALL controls for the category path.
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
  getFormConfigFromPath() {
    return formConfig.filter(fc => fc.forPath == this.routePath)
      .reduce((arr: IFormCategoryConfig) => {
        return arr;
      });
  }

  loadFormControlComponents() {
    const viewContainerRef = this.dynamicComponentDirective.viewContainerRef;
    this.components.forEach((component) => {
      Object.keys(component).forEach((key: string) => {
        if (component[key].associatedComponent) {
          const componentFactory = this.resolver.resolveComponentFactory(component[key].associatedComponent);
          const componentRef = viewContainerRef.createComponent<any>(componentFactory);
          componentRef.instance.config = component[key];
          componentRef.instance.group = this.group;
          this.group.controls[key].setValidators(component[key].validators);
        }
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
    this.controlComponentsNames = ctrlNames;
  }

  assignConfigForComponentName(name: string, config: unknown) {
    console.log('Attempting to extract proper config for ', name);
    console.log('looking in config: ', config);
  }

  createFormGroup() {
    const group = this.fb.group({});
    this.controlComponentsNames.forEach((controlName: string) => {
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
