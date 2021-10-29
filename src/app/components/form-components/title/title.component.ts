import { Component, OnInit } from '@angular/core';
import { BaseControlComponent } from '../base-control/base-control.component';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css'],
})
export class TitleComponent extends BaseControlComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.control = this.group.controls[this.config.name];
  }

}
