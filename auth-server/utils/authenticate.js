const User = require("../models/user");
const argon2 = require("argon2");
const {
  SUCCESS,
  EMAIL_NOT_FOUND,
  INCORRECT_PASSWORD,
} = require("../constants");

const authenticate = async (email, password) => {
  const user = await User.findOne({ email }).exec();

  if (user) {
    const isAuthenticated = await argon2.verify(user.hash, password);

    if (isAuthenticated) {
      return {
        message: SUCCESS,
        user: {
          _id: user._id,
        },
      };
    }

    return { message: INCORRECT_PASSWORD };
  }

  return { message: EMAIL_NOT_FOUND };
};

module.exports = authenticate;
