"use strict";

/**
 * scheme-template controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = {
  getBySchemeId: async (ctx) => {
    const { schemeId } = ctx.params;

    try {
      const schemeTemplate = await strapi
        .service("api::scheme-template.scheme-template")
        .getBySchemeId(schemeId);
      ctx.send(schemeTemplate);
    } catch (error) {
      ctx.throw(404, error.message);
    }
  },
};

// {
//     authenticate: async (ctx, next) => {
//       try {
//         const { body } = ctx.request;
//         const loginResponse = (await (
//           strapi.service("api::login.login") as any
//         ).authenticateUser(body)) as LoginResponse;
//         ctx.body = loginResponse;
//       } catch (err) {
//         ctx.status = 400;
//         ctx.body = { message: err.message };    }
//     },
//   };
