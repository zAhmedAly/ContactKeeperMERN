const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { v4 } = require("uuid");

const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const PasswordReset = require("../models/PasswordReset");

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST api/auth
// @desc      Auth user & get token
// @access    Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials ..." });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials ..." });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: "1h",
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error ...");
    }
  }
);

// @route     POST api/auth/resetpassword
// @desc      Auth user & get token
// @access    Public
router.post(
  "/resetpassword",
  [check("email", "Please include a valid email").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      let user = await User.findOne({ email }).select("-password");

      if (!user) {
        return res.status(400).json({ msg: "Email not found ..." });
      }
      const resetToken = v4().toString().replace(/-/g, "");

      let updateResponse = await PasswordReset.updateOne(
        {
          user: user._id,
        },
        {
          user: user._id,
          token: resetToken,
        },
        {
          upsert: true,
        }
      );

      if (!updateResponse) {
        return res
          .status(400)
          .json({ msg: "Failed to generate reset link, please try again" });
      }

      res.json({ resetToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error ...");
    }
  }
);

module.exports = router;
