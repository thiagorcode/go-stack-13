import { getRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import AppError from '../errors/AppError';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getRepository(Transaction);
    const existingIdUser = await transactionRepository.findOne({
      where: { id },
    });

    if (!existingIdUser) {
      throw new AppError('User ID does not exist!', 404);
    }

    transactionRepository.delete({ id });
  }
}

export default DeleteTransactionService;
