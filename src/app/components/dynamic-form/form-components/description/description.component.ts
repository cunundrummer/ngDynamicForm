import { Component, OnInit } from '@angular/core';
import { BaseControlComponent } from '../base-control/base-control.component';

@Component({
  selector: 'control-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent extends BaseControlComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.control = this.group.controls[this.config.name];
  }

}
