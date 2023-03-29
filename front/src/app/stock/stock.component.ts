import { Component, OnDestroy } from '@angular/core';
import {
  faRotateRight,
  faPlus,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Article } from '../interfaces/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnDestroy {
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;

  constructor(protected readonly articleService: ArticleService) {
    console.log('articleService: ', articleService);
    console.log('new stock component');
  }

  ngOnDestroy(): void {
    console.log('stock component disappear');
  }
}
