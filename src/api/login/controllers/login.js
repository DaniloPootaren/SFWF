/**
 * A set of functions called "actions" for `login`
 */

module.exports = {
  authenticate: async (ctx, next) => {
    try {
      const { body } = ctx.request;
      const loginResponse = await strapi
        .service("api::login.login")
        .authenticateUser(body);
      ctx.body = loginResponse;
    } catch (err) {
      ctx.status = 400;
      ctx.body = { message: err.message };
    }
  },
};
