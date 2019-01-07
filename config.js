const dotenv = require('dotenv');
const path = require('path');

const root = path.join.bind(this, __dirname);
dotenv.config({ path: root('.env') });

module.exports = {
    PORT: process.env.PORT || 3000,
    PORTTWO: process.env.PORTTWO || 3001,
    IS_PRODUCTION: process.env.NODE_ENV === 'production'
  };