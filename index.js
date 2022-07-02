const express = require('express');
const app = express();
const user = require('./components/user/user.network');
const { config } = require('./config');

app.use(express.json());

app.use('/api/users', user);

app.listen(config.port, () => {
    console.log('Server is running on port ' + config.port);
}
);