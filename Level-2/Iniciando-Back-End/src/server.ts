import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database/index';

const PORT_LOCAL = 3000;

const app = express();

app.use(express.json());
// localhost:PORT/files/NOME_DA_IMAGEM
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// Tratativas de erros
app.use(
  (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.get('/', (request, response) => {
  return response.json({ message: 'helloworld' });
});

app.listen(PORT_LOCAL, () => {
  console.log(`Server started on port ${PORT_LOCAL}`);
});
