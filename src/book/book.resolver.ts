import { Resolver, Query } from "@nestjs/graphql";
import { Book } from './book.schema';
import { Book as BookModel } from '../schema.graphql';

@Resolver(of => Book)
export class BookResolver {
    @Query(returns => [Book])
    getAllBooks() {
        let arr : BookModel[] = [
            { id: 1, title: 'Harry Potter', price: 500 },
            { id: 1, title: 'Hunger Games', price: 600 },
            { id: 1, title: 'Robin Hood', price: 900 }
        ]
        
        return arr;
    }
}