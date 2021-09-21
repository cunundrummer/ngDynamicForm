import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-buy-and-sell',
  templateUrl: './buy-and-sell.component.html',
  styleUrls: ['./buy-and-sell.component.css']
})
export class BuyAndSellComponent implements OnInit {
  form!: FormGroup;
  routePath = 'buysell'; // will determine the form to use for the form container component

  constructor() { }

  ngOnInit(): void {
  }

}
