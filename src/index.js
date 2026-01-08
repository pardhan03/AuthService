const express = require('express');
const bodyparser = require('body-parser');

const { PORT } = require('./config/serverConfig');
console.log('process.env.PORT:', process.env.PORT);
const setupAndStartServer = async () => {
    const app = express();

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));

    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`)
    });
}

setupAndStartServer();