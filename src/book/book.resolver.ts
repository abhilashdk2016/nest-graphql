import { Resolver, Query, Args, Int, Mutation } from "@nestjs/graphql";
import { BookService } from "./book.service";
import { Book } from './schema/book.schema';
import { Book as BookModel } from '../schema.graphql';
import { BookEntity } from "./entity/book.entity";
import { AddBookArgs } from './args/add.book.args';

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

    @Mutation(returns => Book, { name: "deleteBook" })
    deleteBookById(@Args({ name: "id", type: () => Int }) id : number ): string {
        return this.bookService.deleteBook(id);
    }

    @Mutation(returns => Book, { name: "addBook" })
    addBook(@Args("addBookArgs") addBookArgs : AddBookArgs ): string {
        return this.bookService.addBook(addBookArgs);
    }

    @Mutation(returns => Book, { name: "updateBook" })
    updateBook(@Args({ name: "id", type: () => Int }) id : number, @Args("updateBookArgs") updateBookArgs : AddBookArgs): string {
        return this.bookService.updateBook(id, updateBookArgs);
    }
}