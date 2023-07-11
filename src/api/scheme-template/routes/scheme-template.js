"use strict";

/**
 * scheme-template router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/scheme-templates/:schemeId",
      handler: "scheme-template.getBySchemeId",
    },
  ],
};
