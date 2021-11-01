import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-buy-and-sell',
  templateUrl: './buy-and-sell.component.html',
  styleUrls: ['./buy-and-sell.component.css']
})
export class BuyAndSellComponent implements OnInit {
  form!: FormGroup;
  // perhaps get the route name from elsewher
  routePath = 'buysell'; // will determine the form to use for the form container component | TO REMOVE if possible
  category?: Observable<Data>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // convert this component into something completely generic?
    this.category = this.route.data;
  }

}
