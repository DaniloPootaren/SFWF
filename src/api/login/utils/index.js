
const getRoleEntity = async () => {
  const roles = await strapi.entityService.findMany(
    "plugin::users-permissions.role"
  );

  return roles.find((role) => role.name === "Authenticated");
};

module.exports = { getRoleEntity };
