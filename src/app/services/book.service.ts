import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private url:string = 'https://fakerestapi.azurewebsites.net/api/Books';
  constructor(private http: HttpClient){

  }
  public get():Promise<Book[]> {
    return this.http.get(this.url).toPromise().then((data: Book[]) => {
          console.log(data); 
          return data;
      });
  }  
}