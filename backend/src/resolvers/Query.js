const Query = {
    /**
     * This can retrieve from anywhere, rest API, locally, or in our case prisma
     * @param {*} parent 
     * @param {*} args 
     * @param {*} context - Do we need headers, cookies etc? also covers DB
     * @param {*} info - 
     */
    dogs(parent, args, context, info) {
        return [
            {name : 'Sam'},
            {name : 'Archie'},
            {name : 'Charlie'},
        ]
    },
    globalDogs(parent, args, context, info) {
        return global.dogs || []
    }
};

module.exports = Query;
