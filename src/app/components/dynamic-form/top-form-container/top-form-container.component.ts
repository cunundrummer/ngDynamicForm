import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, take, takeUntil } from 'rxjs/operators';
import { categoryRoutePrefix, categoryRoutes } from '../models/category-routes';
import { ICategoryRouteInterface } from '../interfaces/category-route.interface';

@Component({
  selector: 'top-dynamic-form-container',
  templateUrl: './top-form-container.component.html',
  styleUrls: ['./top-form-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class TopFormContainerComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  routePath = ''; // will determine the form to use for the form container component | TO REMOVE if possible
  category$ = new BehaviorSubject<string>('');  //  Might not be necessary if made into another component.
  destroyed$ = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const oldPath = 'category/' + this.route.snapshot.params['categoryName'];
    this.routePath = this.route.snapshot.params['categoryName'];

    const catIndex: number | null = this.__findCategoryRouteIndex();
    if (catIndex !== null) {
      this.category$.next(categoryRoutes[catIndex].category);
    }

    this.router.events
      .pipe(
        filter(value => value instanceof NavigationEnd),
        take(1),  // ensures preventing infinite loop
        takeUntil(this.destroyed$)
      )
      .subscribe((event) => {
        if ((event as RouterEvent).url !== oldPath) {
          this.__reloadCurrentRoute();
        }
      });
  }

  /**
   * @description Ensures that component gets reloaded.
   */
  private __reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => {
        this.router.navigate([currentUrl])
          .then(_ => _);  // avoids jsdoc complaint.  Removable.
      });
  }

  /**
   * @Description Searches the category routes if it exists and returns the
   *              index if found.
   * @return {number | null}
   * @warning Might put into a dynamic form service.
   */
  private __findCategoryRouteIndex(cr: ICategoryRouteInterface[] = categoryRoutes): number | null {
    return cr.findIndex((value: ICategoryRouteInterface) => {
      const searchVal = value.route.slice(categoryRoutePrefix.length).toLowerCase();
      return searchVal === this.routePath.toLowerCase();
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }
}
