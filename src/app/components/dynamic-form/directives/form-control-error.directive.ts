import {
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { finalizeMessage } from '../../../utility-functions/observable.utils';
import { IFormControlConfigurations } from '../interfaces/form.interfaces';

enum ControlStatus {
  DISABLED = 'DISABLED',
  PENDING = 'PENDING',
  VALID = 'VALID',
  INVALID = 'INVALID'
}

@Directive({
  selector: '[formControlError]',
  providers: []
})
export class FormControlErrorDirective implements OnInit, OnDestroy {
  @Input() control!: AbstractControl;
  @Input() controlConfiguration!: IFormControlConfigurations;
  @Output() errMsg = new EventEmitter<string | null>();
  destroyed$ = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
    this.setInitialError(); /** Must stay as first method call. See description of method. */

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

  /**
   * @warning Not completely implemented
   * @param {ControlStatus} status
   */
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

        if (this.control?.errors) {
          for (const errorKey of Object.keys(this.control?.errors as string[])) {
            if (errorKey) {
              error = errorKey;
              break;
            }
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
