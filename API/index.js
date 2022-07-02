const express = require('express');
const app = express();
const { config } = require('../config');

app.use(express.json());

app.use('/', (req, res) => {
    res.send('Hello World!');
}
);
app.listen(config.port, () => {
    console.log('Server is running on port ' + config.port);
}
);