const { Strategy, ExtractJwt } = require("passport-jwt");
const { config } = require("../../config").default;
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "pRd4Kq7t9wBzEfH2jLmNpRwTzWuXy1A4",
};

const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});

module.exports = JwtStrategy;
