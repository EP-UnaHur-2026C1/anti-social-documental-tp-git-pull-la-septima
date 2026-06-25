const client = require('../config/redis');

const CACHE_TTL = Number(process.env.CACHE_TTL_SEGUNDOS ?? 60);

const checkCache = (keyBuilder) => async (req, res, next) => {
  try {
    const key = keyBuilder(req);
    const data = await client.get(key);
    if (data) {
      return res.status(200).json(JSON.parse(data));
    }
    res.locals.cacheKey = key;
    next();
  } catch (err) {
    next(err);
  }
};

const primeCache = async (key, data) => {
  await client.set(key, JSON.stringify(data), { EX: CACHE_TTL });
};

module.exports = { checkCache, primeCache };
