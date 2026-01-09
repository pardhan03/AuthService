const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const path = require('path');

dotenv.config({
  // this path define where our evn file is located
  path: path.resolve(__dirname, '../../.env')
});

module.exports = {
    PORT: process.env.PORT,
    SALT: bcrypt.genSaltSync(10),
    JWT_KEY: process.env.JWT_KEY,
};