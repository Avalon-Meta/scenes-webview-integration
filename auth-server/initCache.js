const nodeCache = require("node-cache");
const cache = new nodeCache({ stdTTL: 600 });

module.exports = { cache };
