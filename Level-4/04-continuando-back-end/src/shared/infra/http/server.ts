import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const PORT_LOCAL = 3333;

const app = express();

app.use(cors());
app.use(express.json());
// localhost:PORT/files/NOME_DA_IMAGEM
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

// Tratativas de erros
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
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
});

app.get('/', (request, response) => {
  return response.json({ message: 'helloworld' });
});

app.listen(PORT_LOCAL, () => {
  console.log(`Server started on port ${PORT_LOCAL}`);
});
