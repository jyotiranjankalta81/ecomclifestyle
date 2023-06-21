const roles = ['ADMIN', 'USER'];

const roleRights = new Map();
roleRights.set(roles[0], ['login', 'signup', 'createuser']);
roleRights.set(roles[1], ['login']);


module.exports = {
  roles,
  roleRights,
};
