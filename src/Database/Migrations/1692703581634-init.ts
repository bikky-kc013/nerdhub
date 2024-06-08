import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1692703581634 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO admin(_id, username, password) VALUES('cf5085e144c3441da3d1ad0c2df093', 'nerdhub', '$2b$10$s/wssCv8.zAl/tlr1VgxZuTKBmrdenk0Rg5whS4nFH9tayR/5FGZ6')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM admin WHERE _id = 'cf5085e144c3441da3d1ad0c2df093'`
    );
  }
}
