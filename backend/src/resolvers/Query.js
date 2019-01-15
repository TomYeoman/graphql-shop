const { forwardTo } = require("prisma-binding");
const { NOT_LOGGED_IN_MESSAGE} = require('../../constants')
const { hasPermission, isValidUser } = require('../utils')
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
    // Check if there is a current user ID
    if(context.request) {
      if (!context.request.userId) {
        return null;
      }
      return context.db.query.user({
        where : {id: context.request.userId}
      }, info)
    }
  },
  async users(parent, args, ctx, info) {
    // Check if user has permissions to do this
    if (!ctx.request.userId) {
      return new Error(NOT_LOGGED_IN_MESSAGE)
    }

    // Check they are allowed to perform this action
    isValidUser(ctx)
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE'])

    // If they do query all the users!
    return ctx.db.query.users({
      where: {}
    }, info)

  },
};

module.exports = Query;
