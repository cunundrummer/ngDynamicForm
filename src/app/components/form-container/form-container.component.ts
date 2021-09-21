import { Component, ComponentFactoryResolver, Input, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { formConfig, titleControlConfiguration } from '../../models/form';
import { TitleComponent } from '../form-components/title/title.component';
import { DynamicComponentDirective } from '../../directives/dynamic-component.directive';
import { DescriptionComponent } from '../form-components/description/description.component';

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
    this.loadFormControlComponents(this.controlComponents);
    this.createFormGroup();
  }

  getFormConfigFromPath() {
    return formConfig.filter(fc => fc.forPath == this.routePath)
      .reduce((arr, item) => {
        return arr;
      });
  }

  loadFormControlComponents(componentNames: string[]) {
    /** STEP 1:
     * associate name with component
    */
    const association: Map<string, any> = new Map(
      [
        ['title', TitleComponent],
        ['description', DescriptionComponent]
      ]);

    let components: Component[] = [] as Component[];
    association.forEach((component) => components.push(component));

    const viewContainerRef = this.dynamicComponentDirective.viewContainerRef;
    components.forEach((comp, i ) => {
      const componentFactory = this.resolver.resolveComponentFactory<Component>(components[i] as Type<Component>);
      const componentRef = viewContainerRef.createComponent<any>(componentFactory);
      componentRef.instance.config = titleControlConfiguration;
    })
    this.compConfig = titleControlConfiguration;

    // const componentRef = viewContainerRef.createComponent<any>(componentFactory);
    /** add data... **/
    // componentRef.instance.data = component.data;

  }

  /**
   * Acquires the names of the components that contain the controls
   */
  setControlComponentNames() {
    const controls: any = [];
    let ctrlNames: any[] = [];
    this.configFromPath.formControls.forEach((ctrl: any, index: number) => {
      controls.push(ctrl);
      Object.keys(ctrl).forEach(k => ctrlNames.push(k));
    });
    console.log('Extracted controls: ', controls);
    console.log('Control names: ', ctrlNames);
    this.controlComponents = ctrlNames;
  }

  createFormGroup() {
    this.group = this.fb.group({});

    /**
     * STEP 2 - configure individual controls
     * moved to method: setControlComponentNames
     */

    /**
     * STEP 3
     */
    // for (let i = 0; i < controls.length; i++) {
    //   console.log(controls[i][ctrlNames[i]]);
    //   const controlConfig = controls[i][ctrlNames[i]];
    //   this.group.addControl(controlConfig.name, new FormControl('', controlConfig.validators));
    // }
    // console.log(controls[0].title.label)
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    // this.submit.emit(this.value);
  }

  ngOnDestroy() {}
}
