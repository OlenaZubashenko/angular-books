import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../models/book';


@Pipe({
    name: 'booksFilter'
})

export class BooksFilterPipe implements PipeTransform {
    transform(books: Book[], searchTerm: string): Book[] {
        if(!books || !searchTerm) {
            return books;
        }
        return books.filter(book => 
            book.Title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}