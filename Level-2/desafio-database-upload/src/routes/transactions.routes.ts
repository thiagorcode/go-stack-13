import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

import upload from '../config/upload';

const downloadFileCSV = multer(upload);

const transactionsRouter = Router();

transactionsRouter.get('/', async (_, response) => {
  const transactionRepository = getCustomRepository(TransactionsRepository);
  const transactions = await transactionRepository.find({
    relations: ['category'],
  });

  const balance = await transactionRepository.getBalance();

  return response.json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;

  const createTransaction = new CreateTransactionService();

  const transaction = await createTransaction.execute({
    title,
    value,
    type,
    category,
  });

  return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteTransactionService = new DeleteTransactionService();

  const statusDelete = await deleteTransactionService.execute(id);

  return response.status(204).json(statusDelete);
});

transactionsRouter.post(
  '/import',
  downloadFileCSV.single('file'),
  async (request, response) => {
    const importTransactionsService = new ImportTransactionsService();

    const statusImport = await importTransactionsService.execute(
      request.file.path,
    );

    return response.json(statusImport);
  },
);

export default transactionsRouter;
