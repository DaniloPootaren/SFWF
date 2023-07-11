/**
 * login service.
 */

const {
  createNewUser,
  getMaupassUser,
  getUserByEmail,
  issueToken,
  updateProfile,
} = require("./helpers");

module.exports = () => ({
  authenticateUser: async (login) => {
    const { email, password } = login;
    let maupassUser = null;

    try {
      maupassUser = await getMaupassUser({ email, password });
    } catch (e) {
      throw new Error(e?.details);
    }

    if (maupassUser) {
      const { name, surname, nic, dateOfBirth, emailAddress, zipCode, address, phoneNumber } =
        maupassUser;
      const user = await getUserByEmail(emailAddress);

      if (user) {
        const token = await issueToken(user);
        const profile = await updateProfile({
          name,
          surname,
          nic,
          dateOfBirth,
          id: user.profile.id,
        });
        const { id, username, email } = user;

        return {
          me: maupassUser,
          role: user.role.name,
          access_token: token,
          profileId: profile.id,
          user: {
            id,
            username,
            email,
          },
        };
      } else {
        const newLogin = {
          ...login,
        };

        const { user: newUser, profile } = await createNewUser({
          ...login,
          name,
          surname,
          nic,
          zipCode,
          address,
          phoneNumber,
        });

        const token = await issueToken(newUser);
        const { id, username, email } = newUser;

        return {
          me: maupassUser,
          role: newUser.role.name,
          access_token: token,
          profileId: profile.id,
          user: {
            id,
            username,
            email,
          },
        };
      }
    } else {
      return;
    }
  },
});
