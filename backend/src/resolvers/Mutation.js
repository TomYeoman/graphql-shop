const Mutations = {
    /**
     * 
     * @param {*} parent 
     * @param {*} args 
     * @param {*} context 
     * @param {*} info 
     */
    createDog(parent, args, context, info) {
        console.log(args)
        global.dogs = global.dogs || [];
        const newDog = {name : args.name};
        global.dogs.push(newDog)
        return newDog;
    }
};

module.exports = Mutations;
