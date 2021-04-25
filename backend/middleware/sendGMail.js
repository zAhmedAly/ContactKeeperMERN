const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const config = require("config");

module.exports = {
  sendEmail: async ({ to, subject, text, message }) => {
    // These id's and secrets should come from .env file.
    const CLIENT_ID =
      "51506146739-bavpvd93nm6mgmrdplb6lfv35ed7b0r6.apps.googleusercontent.com";
    const CLEINT_SECRET = "vRoEG04Pm2gTh9oKs0nnK5-8";
    const REDIRECT_URI = "https://developers.google.com/oauthplayground";
    const REFRESH_TOKEN =
      "1//04KugnoOs7w8ZCgYIARAAGAQSNwF-L9Irf3mlMtMJcEdOUVxHAI58klvX_qy5NBQ2mlHZika9zunB3JoP3UYqn2txl40_RYZutt8";
    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLEINT_SECRET,
      REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    /* ============================================ */

    try {
      const accessToken = await oAuth2Client.getAccessToken();

      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "contactkeepermaster@gmail.com",
          clientId: CLIENT_ID,
          clientSecret: CLEINT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });

      const mailOptions = {
        from: "ContactKeeper Admin <contactkeepermaster@gmail.com>",
        to,
        subject,
        text,
        html: message,
      };

      const result = await transport.sendMail(mailOptions);
      console.log(
        `Message preview URL: ${nodemailer.getTestMessageUrl(result)}`
      );

      console.log("Email Sent ... ", result);
    } catch (error) {
      console.log(error.message);
    }
    /* ============================================ */
  },
};
