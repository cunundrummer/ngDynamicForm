import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';
import { findAll } from '../utility-functions/array-utils';
import { FormControlName } from '@angular/forms';
import { IConstraints } from '../models/form';

@Directive({
  selector: '[customInput]'
})
export class CustomInputDirective implements OnInit, AfterViewInit {
  @Input('customInput') config?: any;
  attributes?: { [key: string]: any };

  constructor(private elRef: ElementRef,
              private renderer: Renderer2) {}

  ngOnInit() {

    if (this.config) {
      console.log('CustomInput directive received config object for control: ', this.config.name);
      this.attributes = this.extractConstraintsAndProperties();
    }
  }

  ngAfterViewInit() {
    // console.log(this.elRef);
    for (let attributeName in this.attributes) {
      const attributeValue = this.attributes[attributeName];
      console.log(attributeName, attributeValue);
      if (attributeValue) {
        this.renderer.setAttribute(this.elRef.nativeElement, attributeName, attributeValue);
      } else {
        this.renderer.removeAttribute(this.elRef.nativeElement, attributeName);
      }
    }
  }

  /**
   * @description configures (by truncating into new array) the attributes to add to an input control.
   * @return {string[]} of all values found.
   */
  configure(): string[] {
    let found: string[] = [];
    const attributes: any[] = this.getElementAttributes();
    found = findAll(attributes, Object.keys(this.extractConstraintsAndProperties()));
    return found;
  }

  /**
   * @description Gets ALL attributes and properties from the current element(elRef).
   * @private
   * @return {string[]}
   */
  private getElementAttributes(): string[] {
    const temp: string[] = [];
    Object.entries(this.elRef).map((attr: any[], index: number) => {
      console.log(index)
      for (const a in attr[1]) {
        temp.push(a);
      }
    });

    return temp;
  }

  /**
   * @description extracts all attributes(constraints) and properties form config object
   * @return {type: string, IConstraints}
   */
  private extractConstraintsAndProperties(): {type: string, attributes: IConstraints } {
    return {
      type: this.config.type,
      ...this.config.constraints
    };
  }

}
