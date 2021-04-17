const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { v4 } = require("uuid");
const { sendEmail } = require("../middleware/sendGMail");

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
// @desc      Request password reset and send reset link email
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

      if (updateResponse.n !== 1) {
        return res
          .status(400)
          .json({ msg: "Failed to generate reset link, please try again" });
      }

      /* Send email to user containing password reset link. */
      const resetLink = `${config.get("DOMAIN")}/reset-confirm/${resetToken}`;
      sendEmail({
        // to: user.email,
        to: `"${user.name} ${user.email}`,
        subject: "Password Reset Request",
        message: `<h2>
        Hi ${user.name}, here's your password reset link: 
        <a href='${resetLink}'> Password Reset</a>
        </h2>
        <p>If you did not request this link, ignore it.</p>`,
        text: `Hi ${user.name}, here's your password reset link: ${resetLink}. 
      If you did not request this link, ignore it.`,
      });
      console.log(resetLink);

      res.json({ msg: "Password reset email sent, please check your email" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error ...");
    }
  }
);

// @route     GET api/auth/resetconfirm
// @desc      Check reset password token validity
// @access    Public
router.get("/resetconfirm/:token", async (req, res) => {
  const resetToken = req.params.token;

  try {
    const passwordReset = await PasswordReset.findOne({ token: resetToken });
    console.log("passwordReset = ", passwordReset);

    if (!passwordReset) {
      return res.status(400).json({ msg: "Link expired or not valid ..." });
    }

    res.json({
      token: resetToken,
      valid: passwordReset ? true : false,
    });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error ...");
  }
});

// @route     POST api/auth/resetconfirm
// @desc      Update password and send confirmation email alert
// @access    Public
router.post("/resetconfirm/:token", async (req, res) => {
  const resetToken = req.params.token;
  const newPassword = req.body.password;

  try {
    const passwordReset = await PasswordReset.findOne({ token: resetToken });
    // console.log("RESET CONFIRM (passwordReset) = ", passwordReset);

    if (!passwordReset) {
      return res.status(400).json({ msg: "Link expired or not valid ..." });
    }

    /* Update user */
    let user = await User.findOne({ _id: passwordReset.user });

    // console.log("RESET CONFIRM (user before) = ", user);

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);

    console.log("RESET CONFIRM (user after) = ", user);

    await user.save();

    /* Delete password reset document in collection */
    await PasswordReset.deleteOne({ _id: passwordReset._id });
    /* Send successful password reset email */
    sendEmail({
      to: `"${user.name} <${user.email}>`,
      subject: "Password Reset Successful",
      message: `<h2>Congratulations ${user.name}! Your password reset was successful </h2>`,
      text: `Congratulations ${user.name}! Your password reset was successful.`,
    });

    res.json({ msg: "Successful password reset, please Login" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error ...");
  }
});

module.exports = router;
