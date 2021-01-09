import express from 'express';

/**
 * Não instalar por exemplo @types /express impede que intellisense
 */
const app = express();

app.get('/', (req, res) => {
  return res.json({ message: 'hello World' });
});

app.listen(3333);