
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AddBookArgs {
    id: number;
    title: string;
    price: number;
}

export interface AddBookArgsDB {
    title: string;
    price: number;
}

export interface UpdateBookArgsDB {
    id: number;
    title: string;
    price: number;
}

export interface Book {
    id: number;
    title: string;
    price: number;
}

export interface IQuery {
    index(): string | Promise<string>;
    books(): Book[] | Promise<Book[]>;
    findBookById(id: number): Nullable<Book> | Promise<Nullable<Book>>;
    booksDB(): Book[] | Promise<Book[]>;
    findBookByIdDB(id: number): Nullable<Book> | Promise<Nullable<Book>>;
}

export interface IMutation {
    deleteBook(id: number): string | Promise<string>;
    addBook(addBookArgs: AddBookArgs): string | Promise<string>;
    updateBook(id: number, updateBookArgs: AddBookArgs): string | Promise<string>;
    deleteBookDB(id: number): string | Promise<string>;
    addBookDB(addBookArgs: AddBookArgsDB): string | Promise<string>;
    updateBookDB(updateBookArgs: UpdateBookArgsDB): string | Promise<string>;
}

type Nullable<T> = T | null;
