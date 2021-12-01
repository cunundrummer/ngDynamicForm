import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';
import { findAll } from '../../../utility-functions/array.utils';
import { IFormControlConstraintsBase } from '../interfaces/form.interfaces';

@Directive({
  selector: '[customInput]'
})
export class CustomInputDirective implements OnInit, AfterViewInit {
  @Input('customInput') config?: any;
  attributes?: { [key: string]: any }; // todo: remove - does not need to be property

  constructor(private elRef: ElementRef,
              private renderer: Renderer2) {}

  ngOnInit() {
    if (this.config) {
      console.log('CustomInput directive received config object for control: ', this.config.name);
      this.attributes = this.extractConstraintsAndProperties();
      this.attachAttributesToElement();
    }
  }

  attachAttributesToElement() {
    for (let attributeName in this.attributes) {
      const attributeValue = this.attributes[attributeName];
      console.log(attributeName);
      // Ensures addition of attribute if value is 0. Otherwise
      // custom error directive complains if error is null.
      if ((attributeValue.valueAsString || attributeValue.valueAsNumber) !== null) {
        this.renderer.setAttribute(this.elRef.nativeElement, attributeName, attributeValue);
        // console.log('setting ', attributeName, attributeValue);
      } else {
        this.renderer.removeAttribute(this.elRef.nativeElement, attributeName);
        // console.log('removed ', attributeName, attributeValue);
      }
    }
  }

  ngAfterViewInit() {}

  /**
   * @description configures (by truncating into new array) the attributes to add to an input control.
   * @return {string[]} of all values found.
   */
  configure(): string[] {
    const attributes: any[] = this.getElementAttributes();
    return findAll(attributes, Object.keys(this.extractConstraintsAndProperties()));
  }

  /**
   * @description Gets ALL attributes and properties from the current element(elRef).
   * @private
   * @return {string[]}
   */
  private getElementAttributes(): string[] {
    const temp: string[] = [];
    Object.entries(this.elRef).map((attr: any[]) => {
      for (const a in attr[1]) {
        temp.push(a);
      }
    });
    return temp;
  }

  /**
   * @description extracts all attributes(constraints) and properties form config object
   * @return {type: string, IFormControlConstraintsBase}
   */
  private extractConstraintsAndProperties(): {type: string, attributes: IFormControlConstraintsBase } {
    return {
      type: this.config.type,
      ...this.config.constraints
    };
  }

}
