import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { IFormControlConfigurations } from '../../../models/form';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  @Input() group!: FormGroup;
  @Input() config!: IFormControlConfigurations;
  control!: AbstractControl;

  constructor() { }

  ngOnInit(): void {
    console.log(this.config.validators);
    this.control = this.group.controls[this.config.name];
  }

}
