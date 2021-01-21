import express from 'express';

import { helloWorld } from './route'
/**
 * Não instalar por exemplo @types /express impede que intellisense
 */
const app = express();

app.get('/', helloWorld);

app.listen(3333);