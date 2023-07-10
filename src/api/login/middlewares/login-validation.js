const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),

});

module.exports = async function (ctx, next) {
  const {body} = ctx.request;

  // Validate the request body against the schema
  const {error} = loginSchema.validate(body);
  if (error) {
    ctx.status = 400;
    ctx.body = {
      error: 'Bad Request',
      message: error.details[0].message,
    };
    return;
  }

  // Proceed to the next middleware if validation succeeds
  await next();
}
