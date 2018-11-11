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
};

module.exports = Query;
