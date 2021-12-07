const { OAuth2Client } = require("google-auth-library");
const clientID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(clientID);
async function googleVerify(token = "") {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: clientID,
  });
  const { name, picture, email } = ticket.getPayload();
  return { name, picture, email };
}

module.exports = {
  googleVerify,
};
