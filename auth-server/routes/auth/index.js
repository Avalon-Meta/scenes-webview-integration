/* eslint-disable camelcase */
// eslint-disable-next-line new-cap
const router = require("express").Router();
const User = require("../../models/user");
const authenticate = require("../../utils/authenticate");
const jwt = require("jsonwebtoken");
const checkOAUTH2Client = require("../../utils/checkOAUTH2Client");
const { SUCCESS, EMAIL_NOT_FOUND } = require("../../constants");
const argon2 = require("argon2");
const { nanoid } = require("nanoid");
const { cache } = require("../../initCache");

const LOGIN_URI = process.env.LOGIN_URI;

router.get("/oauth2/authorize", (req, res) => {
  const { response_type, client_id, redirect_uri } = req.query;

  res.redirect(
    `${LOGIN_URI}/?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`
  );
});

router.post("/oauth2/token", async (req, res) => {
  const { grant_type, code, redirect_uri } = req.body;
  const basicToken = req.headers["authorization"].split(" ")[1];
  const b = Buffer.from(basicToken, "base64");
  const decodedString = b.toString();
  const authString = decodedString.split(":");
  const client_id = authString[0];
  const client_secret = authString[1];

  // verify client_id and client_secret and code
  const clientDetailsCache = cache.get(code);

  console.log("Token Endpoint");
  console.log(code, clientDetailsCache);
  if (!clientDetailsCache) {
    return res
      .status(403)
      .json({ mssage: "invalid or expired code, please retry logging in" });
  }

  const isValidOAUTH2Client = await checkOAUTH2Client(
    client_id,
    client_secret,
    redirect_uri,
    clientDetailsCache
  );

  console.log(isValidOAUTH2Client);
  console.log(
    "redirectUri",
    redirect_uri,
    "cacheRedirectURI",
    clientDetailsCache.redirect_uri
  );

  if (isValidOAUTH2Client && grant_type === "authorization_code") {
    // create an access token with uid
    const { uid } = clientDetailsCache;
    // todo: add hostName in jwt field
    token = jwt.sign({ userId: uid }, process.env.TOKEN_KEY, {
      expiresIn: "2h"
    });

    return res.status(200).json({
      access_token: token
    });
  }

  res.status(403).json({ message: "invalid request" });
});

router.post("/register", async (req, res) => {
  const { response_type, client_id, redirect_uri } = req.query;
  const { email, first_name, last_name, password } = req.body;
  const hash = await argon2.hash(password);

  let user;
  const oldUser = await User.findOne({ email }).exec();
  if (oldUser) {
    return res
      .status(403)
      .json({ message: `A user account with ${email} already exists` });
  }
  try {
    user = await User.create({
      email,
      firstName: first_name,
      lastName: last_name,
      hash
    });
  } catch (e) {
    return res.sendStatus(500).json({
      message: "Internal server error. Failed to register a new user"
    });
  }

  const { firstName, lastName } = user;
  const data = {
    email,
    firstName,
    lastName
  };

  if (redirect_uri && client_id && response_type === "code") {
    return res.redirect(
      `${LOGIN_URI}/?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`
    );
  }

  res.status(200).json(data);
});

router.post("/login", async (req, res) => {
  const { client_id, response_type, redirect_uri } = req?.query;
  const { email, password } = req.body;

  const isAuthenticated = await authenticate(email, password);

  // console.log(isAuthenticated);
  const user = isAuthenticated.user;

  if (isAuthenticated.message === EMAIL_NOT_FOUND) {
    return res.status(403).json({ message: "email not found" });
  }

  // initiate Oauth 2.0 flow if client_id param found
  if (client_id && response_type && redirect_uri) {
    // initiate code flow
    if (response_type === "code") {
      const code = nanoid(10);

      // generate a unique code and store it in cache
      // used to verify client later in token endpoint
      cache.set(code, {
        client_id,
        uid: user?._id.toString(),
        redirect_uri
      });

      if (isAuthenticated.message === SUCCESS) {
        return res
          .status(200)
          .json({ url: `${redirect_uri}?code=${code}`, code });
      }

      return res.status(401).json({ message: "invalid credentials" });
    }
  }

  isAuthenticated.message === SUCCESS
    ? res.status(200).json(user)
    : res.sendStatus(403);
});

module.exports = router;
