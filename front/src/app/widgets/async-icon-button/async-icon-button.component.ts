import { Component, Input } from '@angular/core';
import { faTrashAlt, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Observable, of, switchMap, tap } from 'rxjs';

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
  icon = faTrashAlt;
  doSomething() {
    of(undefined)
      .pipe(
        tap(() => {
          this.isRunning = true;
        }),
        switchMap(this.observable),
        tap(() => {
          this.isRunning = false;
        })
      )
      .subscribe();
  }
}
