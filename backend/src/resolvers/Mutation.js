const { forwardTo } = require("prisma-binding");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {

    /**###########################
    # LOCAL       ##############
    ############################ */

    /**
     *
     * @param {*} parent
     * @param {*} args
     * @param {*} context - Do we need headers, cookies etc? also covers DB
     * @param {*} info - Contains frontend information ( the query ), this is how we know what to return
     */
    createDog(parent, args, context, info) {
        console.log(args)
        global.dogs = global.dogs || [];
        const newDog = {name : args.name};
        global.dogs.push(newDog)
        return newDog;
    },

    /**###########################
    # PRISMA       #############
    ############################ */

    async createItem(parent, args, context, info) {

        // TODO - Check if logged in

        const item = await context.db.mutation.createItem({
            data : {...args}
        }, info);

        return item;
    },
    async updateItem(parent, args, context, info) {

        const updates = {...args}
        // We don't want to update the ID
        delete updates.id;

        const item = await context.db.mutation.updateItem({
            data : {...updates},
            where : {
                id : args.id
            }
        }, info);

        return item;
    },
    async deleteItem(parent, args, context, info) {

        const where = {id : args.id};

        // Find item
        const item = await context.db.query.item({ where}, `{ id, title}`);

        console.log(item);
        // Check whether they own it / have permissions
        // TODO
        // Delete it!
        return await context.db.mutation.deleteItem({ where }, info);
    },
    async signup(parent, args, context, info) {
        args.email = args.email.toLowerCase();
        // Hash password ( 1 way hash )
        const password = await bcrypt.hash(args.password, 10)
        // Create the user in DB
        const user =  await context.db.mutation.createUser(
            {
                data : {
                    ...args,
                    password,
                    // Because permissions is an ENUM we must SET it
                    permissions : {set : ['USER']}
                }
            }
            ,info
        );

        // Create a JWT for them
        const token = jwt.sign({userId : user.id}, process.env.APP_SECRET);
        // Set it on the response
        context.response.cookie('token', token, {
            httpOnly : true,
            maxAge : 1000 * 60 * 60 * 24 * 365
        });

        return user;
    },
};

module.exports = Mutations;
