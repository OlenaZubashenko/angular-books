import { Component, Input } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers:[BookService]
})

export class TableComponent {

  @Input()
  searchTerm: string;
  
  books: Book[];
  selectedBook:Book;

  constructor(private booksService:BookService) {
    booksService.get().then(data => {
      this.books = data;
    });
  }

  selectBook(book) {
    this.selectedBook = book;
    console.log(this.selectedBook);
  }

  sortData(sort: Sort) {
    const data = this.books.slice();
    if (!sort.active || sort.direction === '') {
      this.books = data;
      return;
    }

    this.books = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return compare(a[sort.active], b[sort.active], isAsc);      
    });
  }
}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}