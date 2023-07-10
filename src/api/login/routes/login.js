const loginMiddleware = require("../middlewares/login-validation");

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/login",
      handler: "login.authenticate",
      config: {
        policies: [],
        middlewares: [loginMiddleware],
      },
    },
  ],
};
