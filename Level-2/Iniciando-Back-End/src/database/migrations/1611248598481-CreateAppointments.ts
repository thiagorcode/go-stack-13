import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1611248598481
  implements MigrationInterface {
  // Metódo up o que a gente que seja feito no banco de dados.
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
        ],
      }),
    );
  }

  // Metódo down caso ocorra algum problema ele irá desafaz alguma alteração do método Up.
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase('appointments');
  }
}
