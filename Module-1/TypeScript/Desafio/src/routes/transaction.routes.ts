import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import FindTransactionsService from '../services/FindTransactionsService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();
const createTransactionService = new CreateTransactionService(
  transactionsRepository,
);
const findTransactionsService = new FindTransactionsService(
  transactionsRepository,
);

transactionRouter.get('/', (_, response) => {
  try {
    const allTransaction = findTransactionsService.execute();

    return response.json(allTransaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  const { title, value, type } = request.body;
  try {
    const createTransaction = createTransactionService.execute({
      title,
      type,
      value,
    });

    return response.status(200).json(createTransaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
