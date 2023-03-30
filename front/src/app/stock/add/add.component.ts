import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { delay, of, switchMap } from 'rxjs';
import { NewArticle } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  f = new FormGroup({
    name: new FormControl('xxx', [
      Validators.required,
      Validators.minLength(3),
    ]),
    price: new FormControl(0, [Validators.required]),
    qty: new FormControl(0, [Validators.required]),
  });
  faPlus = faPlus;

  constructor(
    private readonly articleService: ArticleService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  submit() {
    console.log('submit');
    of(undefined)
      .pipe(
        delay(1000),
        switchMap(() => {
          const newArticle = this.f.value as NewArticle;
          return this.articleService.add(newArticle);
        }),
        switchMap(() => this.articleService.refresh()),
        switchMap(() => {
          return this.router.navigate(['..'], { relativeTo: this.route });
        })
      )
      .subscribe();
  }
}
