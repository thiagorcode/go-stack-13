import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transaction = await this.find();

    const totalIncome = transaction.reduce((acc, curr) => {
      return curr.type === 'income' ? acc + curr.value : acc + 0;
    }, 0);

    const totalOutcome = transaction.reduce((acc, curr) => {
      return curr.type === 'outcome' ? acc + curr.value : acc + 0;
    }, 0);

    const totalBalance = totalIncome - totalOutcome;

    const balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalBalance,
    };

    return balance;
  }
}

export default TransactionsRepository;
