import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { BookService } from "./book.service";
import { Book } from './schema/book.schema';
import { Book as BookModel } from '../schema.graphql';
import { BookEntity } from "./entity/book.entity";
import { AddBookArgs } from './args/add.book.args';
import { AddBookArgsDB } from "./args/addBookDB.args";
import { UpdateBookArgsDB } from "./args/updateBookDB.args";

@Resolver(of => Book)
export class BookResolver {
    constructor(private readonly bookService: BookService){}

    @Query(returns => [Book], { name: "books" })
    getAllBooks(): BookModel[] {
        return this.bookService.findAllBooks();
    }

    @Query(returns => Book, { name: "findBookById", nullable: true })
    getBookById(@Args({ name: "id", type: () => Int }) id : number ): BookModel {
        return this.bookService.findBookById(id);
    }

    @Mutation(returns => String, { name: "deleteBook" })
    deleteBookById(@Args({ name: "id", type: () => Int }) id : number ): string {
        return this.bookService.deleteBook(id);
    }

    @Mutation(returns => String, { name: "addBook" })
    addBook(@Args("addBookArgs") addBookArgs : AddBookArgs ): string {
        return this.bookService.addBook(addBookArgs);
    }

    @Mutation(returns => String, { name: "updateBook" })
    updateBook(@Args({ name: "id", type: () => Int }) id : number, @Args("updateBookArgs") updateBookArgs : AddBookArgs): string {
        return this.bookService.updateBook(id, updateBookArgs);
    }

    @Query(returns => [Book], { name: "booksDB" })
    getAllBooksDB(): Promise<BookModel[]> {
        return this.bookService.findAllBooksDB();
    }

    @Query(returns => Book, { name: "findBookByIdDB", nullable: true })
    getBookByIdDB(@Args({ name: "id", type: () => Int }) id : number ): Promise<BookEntity> {
        return this.bookService.findBookByIdDB(id);
    }

    @Mutation(returns => String, { name: "deleteBookDB" })
    deleteBookByIdDB(@Args({ name: "id", type: () => Int }) id : number ): Promise<string> {
        return this.bookService.deleteBookDB(id);
    }

    @Mutation(returns => String, { name: "addBookDB" })
    addBookDB(@Args("addBookArgs") addBookArgs : AddBookArgsDB ): Promise<string> {
        return this.bookService.addBookDB(addBookArgs);
    }

    @Mutation(returns => String, { name: "updateBookDB" })
    updateBookDB(@Args("updateBookArgs") updateBookArgs : UpdateBookArgsDB): Promise<string> {
        return this.bookService.updateBookDB(updateBookArgs);
    }
}