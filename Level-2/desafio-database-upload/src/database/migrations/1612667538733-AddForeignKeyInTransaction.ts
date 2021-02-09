import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AddForeignKeyInTransaction1612401633822
  implements MigrationInterface {
  /**
   *
   * Verificar por que a chave estrangeira não está funcionando.
   * Qual seria a lógica para isso funcionar
   * Verificar se é o tipo de category que deveria ser diferente.
   * Ou se ordem entre de manytoONe está certa certa
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'TransactionsCategory',
        columnNames: ['category_id'],
        referencedTableName: 'categories',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transactions', 'TransactionsCategory');
  }
}
