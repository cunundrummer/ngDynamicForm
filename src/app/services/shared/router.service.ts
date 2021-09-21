import { Injectable } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
route?: ActivatedRoute;

  constructor() { }

  /**
   * gets the category from the URL.
   * Then sets the appropriate category config.  Ex. Buy & Sell -> Buy & Sell form config.
   */
  setCategory() {
    this.route?.paramMap
      .pipe(
        catchError(err => {
          // this.router.navigate(['/']);
          return of(err);
        }),
        finalize(() => console.log('paramMap unsubscribed.'))
      )
      .subscribe((val: ParamMap) => {
        const category = val.get('subForm')?.toLocaleLowerCase().trim();
        console.log(category);
        // this.categoryFormConfig$.next(this.findCategoryConfig(category as string) as IControlConfigs);
      });
  }

  removeWhiteSpace(str: string): string {
    return str.trim().replace(/\s+/g, '');
  }
}
