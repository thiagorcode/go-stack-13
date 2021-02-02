import 'reflect-metadata';
import express from 'express';
import routes from './routes';

import uploadConfig from './config/upload';

import './database/index';

const PORT_LOCAL = 3000;

const app = express();

app.use(express.json());
// localhost:PORT/files/NOME_DA_IMAGEM
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.get('/', (request, response) => {
  return response.json({ message: 'helloworld' });
});

app.listen(PORT_LOCAL, () => {
  console.log(`Server started on port ${PORT_LOCAL}`);
});
