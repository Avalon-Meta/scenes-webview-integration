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
  var b = Buffer.from(basicToken, "base64");
  var decodedString = b.toString();
  const authString = decodedString.split(":");
  const client_id = authString[0];
  const client_secret = authString[1];

  console.log(client_secret);
  // verify client_id and client_secret and code
  const isValidOAUTH2Client = await checkOAUTH2Client(
    client_id,
    client_secret,
    redirect_uri
  );

  console.log(code);
  const clientDetails = cache.get(code);

  console.log("inside token endpoint", client_secret);
  console.log(isValidOAUTH2Client);
  console.log(clientDetails);

  // if (client_id && redirect_uri) {
  //   console.log("client_id", redis[code]?.client_id === client_id, client_id);
  //   console.log(
  //     "redirect_uri",
  //     redis[code]?.redirect_uri === redirect_uri,
  //     redirect_uri
  //   );
  //   console.log("grant_type", grant_type === "authorization_code", grant_type);
  // }

  if (
    isValidOAUTH2Client &&
    clientDetails?.client_id === client_id &&
    clientDetails?.redirect_uri === redirect_uri &&
    grant_type === "authorization_code"
  ) {
    // create an access token for the uid
    // send a response

    const { uid } = clientDetails;
    // todo: add hostName in jwt field
    token = jwt.sign({ userId: uid }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    return res.status(200).json({
      access_token: token,
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
      hash,
    });
  } catch (e) {
    return res.sendStatus(500).json({
      message: "Internal server error. Failed to register a new user",
    });
  }

  const { firstName, lastName } = user;
  const data = {
    email,
    firstName,
    lastName,
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

  if (client_id && response_type && redirect_uri) {
    if (response_type === "code") {
      let code = nanoid(10);

      // generate a unique code and store it in cache
      // code : {
      //    client_id: , the client id code is assigned to verify later
      //    email or uid,
      // }
      // use random uid generator later and redis
      cache.set(code, {
        client_id,
        uid: user?._id.toString(),
        redirect_uri,
      });

      console.log("!!!!");

      if (isAuthenticated.message === SUCCESS) {
        return res
          .status(200)
          .json({ url: `${process.env.REDIRECT_URI}?code=${code}`, code });
      }

      return res.status(401).json({ message: "invalid credentials" });
    }
  }

  isAuthenticated.message === SUCCESS
    ? res.status(200).json(user)
    : res.sendStatus(403);
});

module.exports = router;
