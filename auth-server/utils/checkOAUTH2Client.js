/* eslint-disable camelcase */
const Oauth2Client = require("../models/oauth2Client");

const checkOAUTH2Client = async (
  client_id,
  client_secret,
  redirect_uri,
  clientDetailsCache
) => {
  try {
    const client = await Oauth2Client.findOne({ clientId: client_id }).exec();

    if (!client) {
      return false;
    }

    clientDetailsCache?.redirect_uri === redirect_uri;

    const checks = [
      client.clientId === client_id,
      client.clientSecret === client_secret,
      client.redirectURI === redirect_uri,
      clientDetailsCache?.client_id === client_id
    ];

    if (!checks.includes(false)) {
      return true;
    }

    return false;
  } catch (e) {
    console.log("error fetching client");
    return false;
  }
};

module.exports = checkOAUTH2Client;
