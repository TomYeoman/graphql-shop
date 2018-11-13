// Access env variables
const cookieParser = require("cookie-parser");

require('dotenv').config({path : 'variables.env'})

// import our graphql server setups
const createServer = require('./createServer');
const db = require('./db')

const server = createServer();

// This will run in between the request + response
// We now have all cookies in a nice formatted object
server.express.use(cookieParser())

// TODO user express middleware to populate current user

server.start({
    cors : {
        credentials : true,
        origin : process.env.FRONTEND_URL
    }
}, deets => {
    console.log(`server is now running on ${deets.port}`)
})