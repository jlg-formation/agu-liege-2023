import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Article, NewArticle } from '../interfaces/article';

const generateId = () => {
  return Date.now() + '_' + Math.round(Math.random() * 1e12);
};

const articles: Article[] = [
  {
    id: 'a1',
    name: 'Tournevis',
    price: 3.99,
    qty: 100,
  },
  {
    id: 'a2',
    name: 'Pelle',
    price: 5,
    qty: 54,
  },
];

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles$ = new BehaviorSubject<Article[]>(articles);

  constructor() {
    setTimeout(() => {
      this.articles$.value.push({ id: 'a3', name: 'Truc', price: 1, qty: 12 });
      this.articles$.next(this.articles$.value);
    }, 2000);
  }

  add(newArticle: NewArticle): Observable<void> {
    const article = { ...newArticle, id: generateId() };
    articles.push(article);
    return of(undefined);
  }

  refresh(): Observable<void> {
    this.articles$.next(articles);
    return of(void 0);
  }
}
