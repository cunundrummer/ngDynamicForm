import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { IFormControlConfigurations } from '../../../models/form';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleComponent implements OnInit, OnDestroy {
  @Input() group!: FormGroup;
  @Input() config!: IFormControlConfigurations;
  control!: AbstractControl;
  destroyed$ = new Subject<boolean>();
  err: string | null = '' ;

  constructor() { }

  ngOnInit(): void {
    this.control = this.group.controls[this.config.name];
    console.log('Have config for component: ', this.config.name);
    console.log('Inspecting constraints: ', this.config.constraints);
  }

  buildErrorMessage(error: string | null) {
    // todo: move to controlerrordirective
    if (this.config.errorMessages) {
      for (const msg of this.config.errorMessages) {
        if (msg.errName.toLowerCase() === error?.toLowerCase()) {
          this.err = msg.errMsg;
          return;
        }
      }
    }
    this.err = error;
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

}
