const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const config = require("config");

module.exports = {
  sendEmail: async ({ to, subject, text }) => {
    // These id's and secrets should come from .env file.
    const CLIENT_ID =
      "51506146739-bavpvd93nm6mgmrdplb6lfv35ed7b0r6.apps.googleusercontent.com";
    const CLEINT_SECRET = "vRoEG04Pm2gTh9oKs0nnK5-8";
    const REDIRECT_URI = "https://developers.google.com/oauthplayground";
    const REFRESH_TOKEN =
      "1//04XHX4JNlfruWCgYIARAAGAQSNwF-L9IrobihHV0IAvCjSJUPZQD8f8Gq5NjDAII8Ud4ufh4csE6HCDx51wKTSxBT4BO0KKMvCi4";
    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLEINT_SECRET,
      REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    
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
