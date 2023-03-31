import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import {
  catchError,
  delay,
  finalize,
  map,
  of,
  pairwise,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { NewArticle } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  errorMsg = '';
  f = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl(0, [Validators.required]),
    qty: new FormControl(0, [Validators.required]),
  });
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  isSubmitting = false;

  constructor(
    private readonly articleService: ArticleService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.f.controls.qty.valueChanges
      .pipe(
        startWith(this.f.controls.qty.value),
        map((v) => {
          if (v === null) {
            return null;
          }
          return ('' + v) as string;
        }),
        pairwise(),
        map(([previous, current]) => {
          console.log('current: ', current, typeof current);
          console.log('previous: ', previous, typeof previous);

          if (current === null) {
            return null;
          }
          if (current.match(/^[0-9]*$/)) {
            console.log('matched current: ', current);
            return current;
          }
          console.log('not matched');

          console.log('return previous: ', previous);
          if (previous === null) {
            return null;
          }
          const result = previous.replace(/[^0-9]/g, '');
          console.log('result: ', result);

          return result;
        }),
        map((v) => {
          console.log('v: ', v, typeof v);
          if (v === null) {
            return null;
          }
          if (v === '') {
            return null;
          }
          return +v;
        }),
        tap((int) => {
          console.log('int: ', int);
          this.f.controls.qty.setValue(int, { emitEvent: false });
        })
      )
      .subscribe();
  }

  submit() {
    console.log('submit');
    of(undefined)
      .pipe(
        tap(() => {
          this.errorMsg = '';
          this.isSubmitting = true;
        }),
        delay(300),
        switchMap(() => {
          const newArticle = this.f.value as NewArticle;
          return this.articleService.add(newArticle);
        }),
        switchMap(() => this.articleService.refresh()),
        switchMap(() => {
          return this.router.navigate(['..'], { relativeTo: this.route });
        }),
        catchError((err) => {
          console.log('err: ', err);
          this.errorMsg = err.message;
          return of(undefined);
        }),
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe();
  }
}
