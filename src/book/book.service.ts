import { Injectable } from "@nestjs/common";
import { BookEntity } from "./entity/book.entity";

@Injectable()
export class BookService {
    public booksData: BookEntity[] = [];

    addBook(book: BookEntity): string {
        this.booksData.push(book);
        return "Book Added Sucessfully";
    }

    updateBook(id: number, updateBook: BookEntity): string {
        let index = 0;
        const book = this.booksData.filter((book, i) => {
            if(book.id === id) {
                index = i;
                return book;
            }
        });
        this.booksData[index] = book[0];
        return "Book Sucessfully Updated";
    }

    deleteBook(id: number): string {
        this.booksData = this.booksData.filter(book => book.id !== id);
        return 'Book has been deleted';
    }

    findBookById(id: number): BookEntity {
        for(let x = 0; x < this.booksData.length; x++) {
            if (this.booksData[x].id === id) {
                return this.booksData[x];
            }
        }
    }

    findAllBooks(): BookEntity[] {
        return this.booksData;
    }
}