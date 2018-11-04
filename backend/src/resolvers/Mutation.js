const { forwardTo } = require("prisma-binding");

const Mutations = {

    /**###########################
    # LOCAL       ##############
    ############################ */
    
    /**
     * 
     * @param {*} parent 
     * @param {*} args 
     * @param {*} context - Do we need headers, cookies etc? also covers DB
     * @param {*} info - Contains frontend information
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
    deleteItem: forwardTo('db'),

};

module.exports = Mutations;
