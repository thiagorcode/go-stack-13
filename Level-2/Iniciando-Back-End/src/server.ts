import express from 'express';
import routes from './routes';

import './database/index';

const PORT_LOCAL = 3000;

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (request, response) => {
  return response.json({ message: 'helloworld' });
});

app.listen(PORT_LOCAL, () => {
  console.log(`Server started on port ${PORT_LOCAL}`);
});
