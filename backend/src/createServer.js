const {GraphQLServer} = require('graphql-yoga');
require('pretty-error').start();

// These answer the qwuestion of "where does this data come from"

// How do we push data
const Mutation = require('./resolvers/Mutation');
// How do we query data
const Query = require('./resolvers/Query');
const db = require('./db');

// We're essemtially creating 2 servers here, this is for our graphql server which needs it's own type defs
function createServer() {
    return new GraphQLServer({
        typeDefs : './src/schema.graphql',
        resolvers : {
            Mutation,
            Query
        },
        resolverValidationOptions : {
            requireResolversForResolveType : false,
        },
        // We need to be able to access the DB from resolers, context allows us to do so
        context : req => ({...req, db})
    })
}

module.exports = createServer;