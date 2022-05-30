const User = require("../models/Users");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  // destructure the username and password from the request body

  const { username, password } = req.body;

  // check if the username and password are provided
  if (!username || !password) {
    return res.status(400).json({
      message: "Please enter username and password",
    });
  }
  // check if the username already exists
  const user = await User.findOne({ username }).exec();

  if (user) {
    return res.status(400).json({
      message: "Username already exists",
    });
  }

  try {
    // hash the password

    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    // save the user
    const savedUser = await newUser.save();

    // send the user back
    res.status(200).json(savedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  handleNewUser,
};
