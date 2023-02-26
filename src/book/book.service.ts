import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddBookArgsDB } from "./args/addBookDB.args";
import { UpdateBookArgsDB } from './args/updateBookDB.args';
import { BookEntity } from "./entity/book.entity";

@Injectable()
export class BookService {
    public booksData: BookEntity[] = [];

    constructor(@InjectRepository(BookEntity) public readonly bookRepo: Repository<BookEntity>){}

    async findAllBooksDB(): Promise<BookEntity[]> {
        let books = await this.bookRepo.find();
        return books;
    }

    async findBookByIdDB(id: number): Promise<BookEntity> {
        let book = await this.bookRepo.findOne({ where: { id: id }});
        return book;
    }

    async deleteBookDB(id: number): Promise<string> {
        await this.bookRepo.delete(id);
        return "Book Deleted Successfully";
    }

    async addBookDB(addBookDBArgs: AddBookArgsDB): Promise<string> {
        let book: BookEntity = new BookEntity;
        book.title = addBookDBArgs.title;
        book.price = addBookDBArgs.price;
        await this.bookRepo.save(book);
        return "Book Added Successfully";
    }

    async updateBookDB(updateBookDBArgs: UpdateBookArgsDB): Promise<string> {
        let book: BookEntity = await this.bookRepo.findOne({ where: { id: updateBookDBArgs.id }});
        book.title = updateBookDBArgs.title;
        book.price = updateBookDBArgs.price;
        await this.bookRepo.save(book);
        return "Book Updated Successfully";
    }

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