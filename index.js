const express = require('express');
const app = express();
const user = require('./components/user/user.network');
const auth = require('./components/auth/auth.network');
const { config } = require('./config');
const { errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
require('./utils/index');
app.use(express.json());

app.use('/api/users', user);
app.use('/api/auth', auth);

app.use(boomErrorHandler);
app.use(errorHandler);
app.listen(config.port, () => {
    console.log('Servidor principal corriendo en el puerto ' + config.port);
}
);