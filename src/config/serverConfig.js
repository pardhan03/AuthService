const dotenv = require('dotenv');

const path = require('path');

dotenv.config({
  // this path define where our evn file is located
  path: path.resolve(__dirname, '../../.env')
});

module.exports = {
    PORT: process.env.PORT,
}