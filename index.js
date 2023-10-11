import express, { json } from 'express';
const app = express();
import user from './components/user/user.network';
import auth from './components/auth/auth.network';
import { config } from './config';
import { errorHandler, boomErrorHandler } from './middlewares/error.handler';
import './utils/index';
app.use(json());

app.use('/api/users', user);
app.use('/api/auth', auth);

app.use(boomErrorHandler);
app.use(errorHandler);
app.listen(config.port, () => {
    console.log('Servidor principal corriendo en el puerto ' + config.port);
}
);