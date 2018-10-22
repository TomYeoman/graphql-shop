// Access env variables
require('dotenv').config({path : 'variables.env'})

// import our graphql server setups
const createServer = require('./createServer');
const db = require('./db')

const server = createServer();

// TODO use express middleware to handle cookies ( JWT )
// TODO user express middleware to populate current user

server.start({
    cors : {
        credentials : true,
        origin : process.env.FRONTEND_URL
    }
}, deets => {
    console.log(`server is now running on ${deets.port}`)
})