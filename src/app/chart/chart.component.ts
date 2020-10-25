import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  providers:[DatePipe]
})

export class ChartComponent{
  books: Book[];
  publications: {label:string, value: number}[] = []; 
  
  dataSource = {
    chart: {
      caption: "Publications per month",
      subCaption: "Some usefull subtitle...",
      xAxisName: "Month", 
      yAxisName: "Count",
      numberSuffix: "",
      theme: "gammel" 
    },
   
    data: this.publications
  };
  constructor(private booksService:BookService,private datePipe: DatePipe) {
    booksService.get().then(data => this.SetCharData(data));
  }
  private SetCharData(books) {
    books.forEach(book => {
      let label = this.datePipe.transform(book.PublishDate, 'yyyy-MMM');
      let year = this.publications.find(y => y.label === label);
      if (year) {
        year.value += 1;
        return;
      }
      else {
        year = { label: label, value: 1 };
        this.publications.push(year);
      }
    });
  }
}

