const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    "936477090212-6hoa32qtmaegdj731vlp7rtqqa02arhm.apps.googleusercontent.com", // ClientID
    "Ebf-fdY27PMqZvkeTNyPnhmg", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({
    refresh_token: "1//04iZAjFvMLKwnCgYIARAAGAQSNwF-L9Ir2KmuI8HsM7nNtJ_hI5GSRLCllOrUwg3gue8RGyJ0xeULdctOcLbPbhm_PsfdmQbATew"
});
const accessToken = oauth2Client.getAccessToken()
const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: "test.pair.project@gmail.com",
        clientId: "936477090212-6hoa32qtmaegdj731vlp7rtqqa02arhm.apps.googleusercontent.com",
        clientSecret: "Ebf-fdY27PMqZvkeTNyPnhmg",
        refreshToken: "1//04iZAjFvMLKwnCgYIARAAGAQSNwF-L9Ir2KmuI8HsM7nNtJ_hI5GSRLCllOrUwg3gue8RGyJ0xeULdctOcLbPbhm_PsfdmQbATew",
        accessToken: accessToken,
        tls: {
            rejectUnauthorized: false
          }
    }
});


module.exports = smtpTransport