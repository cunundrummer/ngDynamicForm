import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormControlConfigurations } from '../../../models/form';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  @Input() group!: FormGroup;
  @Input() config!: IFormControlConfigurations;

  constructor() { }

  ngOnInit(): void {}

}
