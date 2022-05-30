const User = require("../models/Users");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const refreshToken = cookies.jwt;
  const user = await User.findOne({ refreshToken });

  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err || user.username !== decoded.username) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const roles = Object.values(user.roles);
    const newAccessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ newAccessToken });
  });
};

module.exports = {
  handleRefreshToken,
};
