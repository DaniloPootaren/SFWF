const axios = require("axios");
const {
  MAUPASS_GET_USER_PROFILE_URL,
  MAUPASS_LOGIN_URL,
} = require("../../constants");

const { getRoleEntity } = require("../../utils");

const getMaupassUser = async (payload) => {
  const { email, password } = payload;
  try {
    const maupassResponse = await axios.post(MAUPASS_LOGIN_URL, {
      usernameOrEmailAddress: email,
      password,
    });

    const maupassGetUserResponse = await axios.get(
      MAUPASS_GET_USER_PROFILE_URL,
      {
        headers: {
          Authorization: `Bearer ${maupassResponse.data.result.accessToken}`,
        },
      }
    );

    if (
      maupassResponse.data.success &&
      maupassResponse.data.result.accessToken &&
      maupassGetUserResponse.data.success
    ) {
      return maupassGetUserResponse.data.result;
    } else {
      return null;
    }
  } catch (e) {
    throw e.response.data.error;
  }
};

const updateProfile = async ({ name, surname, id, nic, dateOfBirth }) => {
  try {
    return await strapi.db.query("api::profile.profile").update({
      populate: [],
      data: {
        name,
        surname,
        nic,
        dob: dateOfBirth,
      },
      where: {
        id,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
};

const createNewUser = async ({ email, name, surname, nic, zipCode, address, phoneNumber }) => {
  try {
    const newUser = await strapi.db
      .query("plugin::users-permissions.user")
      .create({
        populate: ["role"],
        data: {
          username: email,
          email,
          provider: "MAUPASS",
          confirmed: true,
          role: (await getRoleEntity()).id,
        },
      });

    const profile = await strapi.db.query("api::profile.profile").create({
      data: {
        users_permissions_user: newUser.id,
        firstname: name,
        lastname: surname,
        nic,
        zipCode,
        address,
        phoneNumber,
        email,
      },
    });

    return { user: newUser, profile };
  } catch (e) {
    console.log("???", e);
    throw e;
  }
};

const getUserByEmail = async (email) => {
  try {
    const [user] = await strapi.entityService.findMany(
      "plugin::users-permissions.user",
      {
        populate: ["profile", "role"],
        filters: {
          email,
        },
      }
    );
    return user;
  } catch (e) {
    throw e;
  }
};

const issueToken = (user) => {
  return strapi.plugins["users-permissions"].services.jwt.issue({
    id: user.id,
    role: user.role.name,
  });
};

module.exports = {
  getMaupassUser,
  issueToken,
  getUserByEmail,
  createNewUser,
  updateProfile,
};
