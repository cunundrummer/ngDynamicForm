import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormCategoryConfig, IFormControlConfigurations } from '../../../models/form';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  @Input() group!: FormGroup;
  @Input() config!: IFormControlConfigurations;

  constructor() { }

  ngOnInit(): void {
  }

}
