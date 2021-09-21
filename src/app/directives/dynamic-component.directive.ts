import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamicComponent]'
})
export class DynamicComponentDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
    /**
     *  DynamicComponentDirective injects ViewContainerRef to gain access to the view container of the element that will
     *  host the dynamically added component.
     */
  }

}
