import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = [
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

  constructor() {}
}
