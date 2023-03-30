import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { catchError, finalize, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-async-icon-button',
  templateUrl: './async-icon-button.component.html',
  styleUrls: ['./async-icon-button.component.scss'],
})
export class AsyncIconButtonComponent {
  faCircleNotch = faCircleNotch;
  isRunning = false;
  @Input()
  observable: () => Observable<void> = () => of(undefined);

  @Input()
  label = '';

  @Input()
  icon = faCircleNotch;

  @Output()
  error = new EventEmitter<Error>();

  @Output()
  start = new EventEmitter<void>();

  doSomething() {
    of(undefined)
      .pipe(
        tap(() => {
          this.isRunning = true;
          this.start.emit();
        }),
        switchMap(this.observable),
        catchError((err) => {
          console.log('err: ', err);
          this.error.emit(err instanceof Error ? err : new Error(err));
          return of(undefined);
        }),
        finalize(() => {
          this.isRunning = false;
        })
      )
      .subscribe();
  }
}
