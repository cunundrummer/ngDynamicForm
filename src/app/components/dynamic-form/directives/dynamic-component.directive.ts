import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[dynamicComponent]'
})
export class DynamicComponentDirective implements OnInit{
  @Input() config?: any; // will not receive anything unless PASSED AS [input]='xx'
  @Input() group?: FormGroup; // will not receive anything unless PASSED AS [input]='xx'

  constructor(public viewContainerRef: ViewContainerRef) {
    /**
     *  DynamicComponentDirective injects ViewContainerRef to gain access to the view container of the element that will
     *  host the dynamically added component.
     */
  }

  ngOnInit() {
    // console.log(this.viewContainerRef);
  }


}
