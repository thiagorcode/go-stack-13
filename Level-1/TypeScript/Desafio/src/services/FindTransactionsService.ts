import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface BalanceObject {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  transactions: Array<Transaction>;
  balance: BalanceObject;
}

class FindTransactionsService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): TransactionDTO {
    const findAllTransactions = this.transactionsRepository.all();

    const balance = this.transactionsRepository.getBalance();

    return {
      transactions: findAllTransactions,
      balance,
    };
  }
}

export default FindTransactionsService;
