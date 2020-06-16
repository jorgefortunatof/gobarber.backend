import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

class AddAvatarFildToUsers1592269657320 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'users',
			new TableColumn({
				name: 'avatar',
				type: 'varchar',
				isNullable: true,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('users', 'avatar');
	}
}

export default AddAvatarFildToUsers1592269657320;
