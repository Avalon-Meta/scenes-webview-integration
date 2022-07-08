const checkJWT = require("../../utils/checkJWT");
const router = require("express").Router();
const User = require("../../models/user");

router.get("/userinfo", checkJWT, async (req, res) => {
  console.log(req.user);
  const { userId } = req?.user;
  try {
    const user = await User.findById(userId);

    if (user) {
      const { email, firstName, lastName } = user;

      const data = {
        email,
        first_name: firstName,
        last_name: lastName,
        uid: userId,
      };
      return res.status(200).json(data);
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

module.exports = router;
