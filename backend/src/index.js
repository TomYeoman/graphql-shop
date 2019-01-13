// Access env variables
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

require('dotenv').config({path : 'variables.env'})

// import our graphql server setups
const createServer = require('./createServer');
const db = require('./db')

const server = createServer();

// This will run in between the request + response
// We now have all cookies in a nice formatted object
server.express.use(cookieParser())

// TODO user express middleware to populate current user
server.express.use((req,res,next) => {
    const {token} = req.cookies;

    if (token) {
        const {userId} = jwt.verify(token, process.env.APP_SECRET);
        req.userId = userId;
    }
    next();
})

server.start({
    cors : {
        credentials : true,
        origin : process.env.FRONTEND_URL
    }
}, deets => {
    console.log(`server is now running on ${deets.port}`)
})