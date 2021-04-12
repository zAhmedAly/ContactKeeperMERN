const nodemailer = require("nodemailer");
const config = require("config");

module.exports = {
  sendEmail: async ({ to, subject, text }) => {
    /* Create nodemailer transporter using environment variables. */
    const transporter = nodemailer.createTransport({
      host: config.get("EMAIL_HOST"),
      port: Number(config.get("EMAIL_PORT")),
      auth: {
        user: config.get("EMAIL_ADDRESS"),
        pass: config.get("EMAIL_PASSWORD"),
      },
    });
    /* Send the email */
    let info = await transporter.sendMail({
      from: `"${config.get("EMAIL_NAME")}" <${config.get("EMAIL_ADDRESS")}>`,
      to,
      subject,
      text,
    });
    /* Preview only available when sending through an Ethereal account */
    console.log(`Message preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  },
};
