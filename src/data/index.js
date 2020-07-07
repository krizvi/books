const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'Author information',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLString)},
        books: {
            type: new GraphQLList(BookType),
            description: 'list of all books written by this ',
            resolve: (author) => books.filter(book => book.authorId === author.id)
        },
    })
})
const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'book details written by an author',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLString)},
        authorId: {type: GraphQLNonNull(GraphQLInt)},
        author: {
            type: GraphQLNonNull(AuthorType),
            description: 'author data',
            resolve: (book) => authors.find(author => author.id === book.authorId)
        }

    })
})
const AuthorBooksRootQueryType = new GraphQLObjectType({
    name: 'AuthorBooksQuery',
    description: 'Root Query to define queries to access Authors and their corresponding Book objects',
    fields: () => ({
        book: {
            type: BookType,
            description: 'record of a single book',
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (parent, args) => books.find(b => b.id === args.id)
        },
        author: {
            type: AuthorType,
            description: 'record of a single author',
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (parent, args) => authors.find(a => a.id === args.id)
        },
        books: {
            type: new GraphQLList(BookType),
            description: 'list of all books in the repo.',
            resolve: () => books
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: 'list of all authors',
            resolve: () => authors
        },
    })

})
// const AuthorBooksRootMutationType = new GraphQLObjectType({})

const schema = new GraphQLSchema({
    query: AuthorBooksRootQueryType,
    // mutation: AuthorBooksRootMutationType
})

const authors = [
    {id: 1, name: 'J. K. Rowling'},
    {id: 2, name: 'J. R. R. Tolkien'},
    {id: 3, name: 'Brent Weeks'}
]

const books = [
    {id: 1, name: 'Harry Potter and the Chambers of Secret', authorId: 1},
    {id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1},
    {id: 3, name: 'Harry Potter and the Goblet of fire', authorId: 1},
    {id: 4, name: 'The fellowship of the ring', authorId: 2},
    {id: 5, name: 'The two towers', authorId: 2},
    {id: 6, name: 'The Return of the King', authorId: 2},
    {id: 7, name: 'The way of shadows', authorId: 3},
    {id: 8, name: 'Beyond the shadows', authorId: 3}
]

module.exports = {schema, books, authors}
