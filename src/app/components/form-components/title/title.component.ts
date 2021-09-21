import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  @Input() frmGroup!: FormGroup;
  @Input() config!: {};

  constructor() { }

  ngOnInit(): void {
  }

}
