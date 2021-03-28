const express = require('express');
require('dotenv').config();

const { discordListener } = require('./clients/discord');
const { getSecret } = require('./security/secret');


const app = express();

app.get('/', (req, res) => {
    res.status(200).send("Hello world we made it!");
})

app.get('/dyson', async (req, res) => {
    secret = await getSecret();
    discordListener(secret)
    res.status(200).send("Hello from EC2!");
});

app.listen(3000, () => console.log('Server running now on port 3000'));