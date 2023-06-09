import { Component, OnDestroy } from '@angular/core';
import {
  faPlus,
  faRotateRight,
  faTrashAlt,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';
import { delay, map, Observable, of, switchMap, tap } from 'rxjs';
import { Article } from '../interfaces/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnDestroy {
  isLoading = true;
  errorMsg = '';
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;
  faCircleNotch = faCircleNotch;
  selectedArticles = new Set<Article>();

  constructor(protected readonly articleService: ArticleService) {
    console.log('articleService: ', articleService);
    console.log('new stock component');
    this.articleService.articles$
      .pipe(
        map((articles) => {
          this.isLoading = articles === undefined;
        }),
        switchMap(() => {
          if (this.isLoading) {
            return of(undefined).pipe(
              delay(2000),
              switchMap(() => this.articleService.refresh())
            );
          }
          return of(undefined);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    console.log('stock component disappear');
  }

  private refreshAndClear(obs: Observable<void>): Observable<void> {
    return obs.pipe(
      switchMap(() => {
        return this.articleService.refresh();
      }),
      tap(() => {
        this.selectedArticles.clear();
      })
    );
  }

  remove() {
    console.log('about to remove');
    return of(undefined).pipe(
      delay(2000),
      switchMap(() => {
        const ids = [...this.selectedArticles].map((a) => a.id);
        return this.articleService.remove(ids);
      }),
      (obs) => this.refreshAndClear(obs)
    );
  }

  refresh() {
    console.log('refreshing');
    return of(undefined).pipe(delay(2000), this.refreshAndClear.bind(this));
  }

  select(a: Article) {
    console.log('a: ', a);
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }

  setErrorMsg(err: Error) {
    this.errorMsg = err.message;
  }

  resetErrorMsg() {
    this.errorMsg = '';
  }
}
