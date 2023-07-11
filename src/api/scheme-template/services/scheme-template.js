"use strict";

/**
 * scheme-template service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = {
  /**
   * Custom function to get scheme template by scheme ID
   * @param {number} schemeId - The ID of the scheme
   * @returns {Promise<object>} The scheme template associated with the scheme ID
   */
  async getBySchemeId(schemeId) {
    const schemeTemplate = await strapi.db
      .query("api::scheme-template.scheme-template")
      .findOne({
        populate: ['section.choice_selection.choices', 'section.number_selection', 'section.phone_selection', 'section.text_selection'],
        where: {
          scheme: schemeId,
        },
      });

    console.log(">>", schemeTemplate);

    if (!schemeTemplate) {
      throw new Error(`Scheme not found for scheme ID: ${schemeId}`);
    }

    // Populate the components fields in the content type
    // const populatedSchemeTemplate = await strapi.service("api::scheme-template.scheme-template").

    return schemeTemplate;
  },
};
