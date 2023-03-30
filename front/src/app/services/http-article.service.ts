import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { Article, NewArticle } from '../interfaces/article';
import { ArticleService } from './article.service';

const url = 'http://localhost:3000/api/articles';

@Injectable({
  providedIn: 'root',
})
export class HttpArticleService extends ArticleService {
  constructor(private readonly http: HttpClient) {
    super();
    console.log('http article instantiated');
  }

  override refresh(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => this.http.get<Article[]>(url)),
      map((articles) => {
        this.articles$.next(articles);
      }),
      catchError((err) => {
        return throwError(() => new Error('Problème de chargement'));
      })
    );
  }

  override add(newArticle: NewArticle): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => this.http.post<void>(url, newArticle)),
      catchError((err) => {
        return throwError(() => new Error("Erreur lors de l'ajout"));
      })
    );
  }

  override remove(ids: string[]): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => this.http.delete<void>(url, { body: ids })),
      catchError((err) => {
        return throwError(() => new Error('Erreur lors de la suppression'));
      })
    );
  }
}
