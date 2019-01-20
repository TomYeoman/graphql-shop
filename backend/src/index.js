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

// USer express middleware to populate current user
server.express.use((req,res,next) => {
    const {token} = req.cookies;

    if (token) {
        const {userId} = jwt.verify(token, process.env.APP_SECRET);
        req.userId = userId;
    }
    next();
})

// User express middleware to populate permissions
server.express.use(async (req,res,next) => {
    if(!req.userId) return next();
    const user = await db.query.user(
        {where: { id : req.userId}},
      '{id, permissions, email, name}',
    );

    req.user = user;

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