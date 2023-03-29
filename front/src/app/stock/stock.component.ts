import { Component, OnDestroy } from '@angular/core';
import {
  faRotateRight,
  faPlus,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Article } from '../interfaces/article';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnDestroy {
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
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;

  constructor() {
    console.log('new stock component');
  }

  ngOnDestroy(): void {
    console.log('stock component disappear');
  }
}
