import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  // Realizar operação de total de entrada e saida e o total dessas operações
  public getBalance(): Balance {
    const newTransaction = this.transactions;

    const totalIncome = newTransaction.reduce((acc, curr) => {
      return curr.type === 'income' ? acc + curr.value : acc + 0;
    }, 0);

    const totalOutcome = newTransaction.reduce((acc, curr) => {
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

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    const currentBalance = this.getBalance();

    if (
      transaction.type === 'outcome' &&
      transaction.value > currentBalance.total
    ) {
      throw Error('Saldo insuficiente');
    }

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
