import {
  Directive,
  EventEmitter,
  Input, OnChanges,
  OnDestroy,
  OnInit,
  Output, SimpleChanges, ViewChild,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, of, Subject } from 'rxjs';
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
export class FormControlErrorDirective implements OnInit, OnChanges, OnDestroy {
  @Input() control!: AbstractControl;
  @Output() errMsg = new EventEmitter<string | null>();
  touched$ = new BehaviorSubject<boolean>(this.control?.touched);
  destroyed$ = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
    this.setInitialError();

    const statusObs$ = this.control.statusChanges
      .pipe(
        takeUntil(this.destroyed$),
        finalize(finalizeMessage.bind(this, 'controlErr.statusChanges'))
      );
    statusObs$.subscribe((status: ControlStatus) => {
      this.errMsg.emit(this.handleStatus(status));
    });
  }

  /**
   * @description Displays error message after touched.  Required to prevent a bug where
   *              the control shows that it is in error, but does not display a message.
   */
  setInitialError() {
    if (this.errMsg) {
      this.errMsg.emit(this.handleStatus(ControlStatus.INVALID));
    }
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  handleStatus(status: ControlStatus) {
    console.log('Control is ', status);
    switch (status) {
      case ControlStatus.PENDING:
        break;
      case ControlStatus.DISABLED:
        break;
      case ControlStatus.VALID:
        break;
      case ControlStatus.INVALID:
        let error: string | null = null;
        for (const errorKey of Object.keys(this.control.errors as string[])) {
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
