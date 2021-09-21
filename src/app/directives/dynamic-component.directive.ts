import { Directive, ElementRef, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[dynamicComponent]'
})
export class DynamicComponentDirective implements OnInit{
  @Input() config: any;
  @Input() group!: FormGroup;

  constructor(public viewContainerRef: ViewContainerRef, private elRef: ElementRef) {
    /**
     *  DynamicComponentDirective injects ViewContainerRef to gain access to the view container of the element that will
     *  host the dynamically added component.
     */
  }

  ngOnInit() {
    console.log(this.viewContainerRef);
    console.log(this.elRef);
    console.log(this.config);
  }


}
