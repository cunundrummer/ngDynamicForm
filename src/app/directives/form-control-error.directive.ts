import {
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { finalizeMessage } from '../utility-functions/observable-utils';

enum ControlStatus {
  DISABLED = 'DISABLED',
  PENDING = 'PENDING',
  VALID = 'VALID',
  INVALID = 'INVALID'
}

@Directive({
  selector: '[formControlError]'
})
export class FormControlErrorDirective implements OnInit, OnDestroy {
  @Input() controlErr!: AbstractControl;
  @Output() errMsg = new EventEmitter<string | null>();
  destroyed$ = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
    const statsObs$ = this.controlErr.statusChanges
      .pipe(
        takeUntil(this.destroyed$),
        tap(status => console.log(status)),
        finalize(finalizeMessage.bind(this, 'controlErr.statusChanges'))
      );
    statsObs$.subscribe((status: ControlStatus) => {
      this.errMsg.emit(this.handleStatus(status));
    });
  }

  handleStatus(status: ControlStatus) {
    switch (status) {
      case ControlStatus.PENDING:
        break;
      case ControlStatus.DISABLED:
        break;
      case ControlStatus.VALID:
        break;
      case ControlStatus.INVALID:
        let error: string | null = null;
        for (const errorKey of Object.keys(this.controlErr.errors as string[])) {
          if (errorKey) {
            error = errorKey;
            break;
          }
        }
        return error;
    }
    return null;
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

}
