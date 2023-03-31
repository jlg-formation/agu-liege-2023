import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { catchError, delay, finalize, of, switchMap, tap } from 'rxjs';
import { NewArticle } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  errorMsg = '';
  f = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl(0, [Validators.required]),
    qty: new FormControl(0, [Validators.required]),
  });
  faPlus = faPlus;
  faCircleNotch = faCircleNotch;
  isSubmitting = false;

  constructor(
    private readonly articleService: ArticleService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

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
