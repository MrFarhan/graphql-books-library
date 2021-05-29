const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema, GraphQLID } = require("graphql");
const axios = require("axios");
const _ = require("lodash");


const dummyBooks = [
    {
        name: 'The Awakening',
        genre: 'Kate Chopin',
        id: "1",
        authorId: "1"
    },
    {
        name: 'City of Glass',
        genre: 'Paul Auster',
        id: "2",
        authorId: "2"

    },
    {
        name: 'Age of Science',
        genre: 'Paul Auster',
        id: "2",
        authorId: "2"

    },
    {
        name: 'Throns and Marvels',
        genre: 'Paul Auster',
        id: "2",
        authorId: "2"

    },
    {
        name: 'Tom and Jerry',
        genre: 'Paul Auster',
        id: "2",
        authorId: "2"

    },
];

const dummyAuthors = [
    {
        name: 'The Farhan',
        age: 23,
        id: "1"
    },
    {
        name: 'The Rehman Baba',
        age: 103,
        id: "2"

    },
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log('parent is ' + parent)
                return _.find(dummyAuthors, { id: parent.authorId })
            }
        }

    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Authors',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLID },
        book: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(dummyBooks, { authorId: parent.id })
            }
        }


    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return _.find(dummyBooks, { id: args.id })
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return dummyBooks
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(dummyAuthors, { id: args.id })
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return dummyAuthors
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query: RootQuery
})