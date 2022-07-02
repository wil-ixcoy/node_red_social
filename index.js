const express = require('express');
const app = express();
const user = require('./components/user/user.network');
const { config } = require('./config');
const { errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

app.use(express.json());

app.use(errorHandler);
app.use(boomErrorHandler);
app.use('/api/users', user);

app.listen(config.port, () => {
    console.log('Server is running on port ' + config.port);
}
);