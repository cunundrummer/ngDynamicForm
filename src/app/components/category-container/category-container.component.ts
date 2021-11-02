import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, take, takeUntil } from 'rxjs/operators';
import { categoryRoutePrefix, categoryRoutes } from '../../models/category-routes';
import { ICategoryRouteInterface } from '../../interfaces/category-route.interface';

@Component({
  selector: 'app-category-container',
  templateUrl: './category-container.component.html',
  styleUrls: ['./category-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CategoryContainerComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  routePath = ''; // will determine the form to use for the form container component | TO REMOVE if possible
  category$ = new BehaviorSubject<string>('');
  destroyed$ = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const oldPath = 'category/' + this.route.snapshot.params['categoryName'];
    this.routePath = this.route.snapshot.params['categoryName'];

    const catIndex: number | null = this.findCategoryRouteIndex();
    if (catIndex !== null) {
      this.category$.next(categoryRoutes[catIndex].category);
    }

    this.router.events
      .pipe(
        filter(value => value instanceof NavigationEnd),
        take(1),
        takeUntil(this.destroyed$)
      )
      .subscribe((event) => {

        console.log((event as RouterEvent).url, oldPath);
        if ((event as RouterEvent).url !== oldPath) {
          console.log('reloading...');
          this.reloadCurrentRoute();
        }
      });
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => {
        this.router.navigate([currentUrl])
          .then(_ => _);
      });
  }

  /**
   * @Description Searches the category routes if it exists and returns the
   *              index if found.
   * @return {number | null}
   */
  findCategoryRouteIndex(cr: ICategoryRouteInterface[] = categoryRoutes): number | null {
    const index = cr.findIndex((value: ICategoryRouteInterface) => {
      const searchVal = value.route.slice(categoryRoutePrefix.length).toLowerCase();
      console.log(searchVal === this.routePath.toLowerCase());
      return searchVal === this.routePath.toLowerCase();
    });
    console.log(index, null === 0, null == 0);
    return index;
  }


  ngOnDestroy() {
    this.destroyed$.next(true);
  }
}
