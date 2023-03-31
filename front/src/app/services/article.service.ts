import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Article, NewArticle } from '../interfaces/article';

const generateId = () => {
  return Date.now() + '_' + Math.round(Math.random() * 1e12);
};

export let articles: Article[] = [];

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles$ = new BehaviorSubject<undefined | Article[]>(undefined);

  add(newArticle: NewArticle): Observable<void> {
    const article = { ...newArticle, id: generateId() };
    articles.push(article);
    return of(undefined);
  }

  refresh(): Observable<void> {
    this.articles$.next(articles);
    return of(void 0);
  }

  remove(ids: string[]): Observable<void> {
    articles = articles.filter((a) => !ids.includes(a.id));
    return of(void 0);
  }
}
