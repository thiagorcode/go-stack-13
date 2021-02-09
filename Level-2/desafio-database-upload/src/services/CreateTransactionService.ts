import { getRepository, getCustomRepository } from 'typeorm';

import TransactionRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';
import Category from '../models/Category';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const categoryRepository = getRepository(Category);
    const transactionRepository = getRepository(Transaction);
    const customTransactionRepository = getCustomRepository(
      TransactionRepository,
    );
    let createdCategory = null;

    const balance = await customTransactionRepository.getBalance();

    if (type === 'outcome' && value >= balance.total) {
      throw new AppError('insufficient funds', 400);
    }
    const findIfExistCategory = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!findIfExistCategory) {
      const createCategory = categoryRepository.create({
        title: category,
      });

      createdCategory = await categoryRepository.save(createCategory);
    }

    const transaction = transactionRepository.create({
      title,
      type,
      value,
      category_id: findIfExistCategory?.id || createdCategory?.id,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
