const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema, GraphQLID } = require("graphql");
const axios = require("axios");
const _ = require("lodash");


const dummyBooks = [
    {
        name: 'The Awakening',
        genre: 'Kate Chopin',
        id: "1"
    },
    {
        name: 'City of Glass',
        genre: 'Paul Auster',
        id: "2"

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
    name: 'Books',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }

    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Authors',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLID }

    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        books: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return _.find(dummyBooks, { id: args.id })
            }
        },
        authors: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(dummyAuthors, { id: args.id })
            }
        }
    })
})

module.exports = new GraphQLSchema({
    query: RootQuery
})