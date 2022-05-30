const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Please enter username and password",
    });
  }

  try {
    const user = await User.findOne({ username }).exec();
    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Incorrect password" });
    } else {
      //create role
      const roles = Object.values(user.roles);

      //create token
      const accessToken = jwt.sign(
        {
          username: user.username,
          roles: roles,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      const refreshToken = jwt.sign(
        {
          username: user.username,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      //save refresh token with current user
      user.refreshToken = refreshToken;
      const result = await user.save();
      console.log(result);

      res.cookie("jwt", refreshToken, {
        httpOnly: true,

        //refresh token expires in 7 days
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        accessToken,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = { handleLogin };
