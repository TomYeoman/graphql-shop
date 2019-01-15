const { NOT_LOGGED_IN_MESSAGE } = require('../constants')

exports.isValidUser = (ctx) => {
  if (!ctx.request.userId) {
    throw new Error(NOT_LOGGED_IN_MESSAGE)
  }
}

function hasPermission(user, permissionsNeeded) {
  const matchedPermissions = user.permissions.filter(permissionTheyHave =>
    permissionsNeeded.includes(permissionTheyHave)
  );
  if (!matchedPermissions.length) {
    throw new Error(`You do not have sufficient permissions

      : ${permissionsNeeded}

      You Have:

      ${user.permissions}
      `);
  }
}

exports.hasPermission = hasPermission;
