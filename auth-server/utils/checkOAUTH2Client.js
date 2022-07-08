const Oauth2Client = require("../models/oauth2Client");

const checkOAUTH2Client = async (client_id, client_secret, redirect_uri) => {
  try {
    const client = await Oauth2Client.findOne({ clientId: client_id }).exec();

    if (
      client.clientId === client_id &&
      client.clientSecret === client_secret &&
      client.redirectURI === redirect_uri
    ) {
      return true;
    }

    return false;
  } catch (e) {
    console.log("error fetching client");
    return false;
  }
};

module.exports = checkOAUTH2Client;
