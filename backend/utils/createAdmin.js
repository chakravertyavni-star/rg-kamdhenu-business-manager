const bcrypt = require("bcryptjs");

const User = require("../models/User");

const createAdmin = async () => {

  try {

    const existingAdmin =
      await User.findOne({
        username: "admin",
      });

    if (existingAdmin) {

      console.log(
        "Admin already exists"
      );

      return;
    }

    const hashedPassword =
      await bcrypt.hash(
        "admin123",
        10
      );

    await User.create({
      username: "admin",
      password:
        hashedPassword,
      role: "admin",
    });

    console.log(
      "Admin Created"
    );

  } catch (error) {

    console.error(error);

  }

};

module.exports = createAdmin;