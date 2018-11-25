const { forwardTo } = require("prisma-binding");

console.log(forwardTo)

const Query = {
  /**###########################
    # LOCAL       ##############
    ############################ */

  fetchDogs(parent, args, context, info) {
    return [{ name: "Sam" }, { name: "Archie" }, { name: "Charlie" }];
  },
  fetchGlobalDogs(parent, args, context, info) {
    return global.dogs || [];
  },

  /**###########################
    # PRISMA       #############
    ############################ */

  async fetchItems(parent, args, context, info) {
    const item = await context.db.query.items(
      {
        data: { ...args }
      },
      info
    );

    return item;
  },
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  async me(parent, args, context, info) {
    // CHeck if there is a current user ID

    console.log("Fetching me <<<<<<<<<<<<<<")
    if(context.request) {

      console.log("Found request <<<<<<<<<<<<<<")

      if (!context.request.userId) {
        return null;
      }

      console.log("How bout here")
      console.log(`Trying to query user : {context.request.userId}`)
      return context.db.query.user({
        where : {id: context.request.userId}
      }, info)
    }
  },
};

module.exports = Query;
