// This file connects to the remote prisma DB + allows us to query it with JS

const { Prisma } = require('prisma-binding');

// console.log(process.env)
const db = new Prisma({
    // Tells us all our types / queries / mutations
    typeDefs: 'src/generated/prisma.graphql',
    // Give access to our prisma datanase
    endpoint : process.env.PRISMA_ENDPOINT,
    // This is the "password" to our database we use in production
    secret : process.env.PRISMA_SECRET,
    debug : false
});

module.exports = db;