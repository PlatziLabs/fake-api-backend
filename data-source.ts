import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { ENTITIES } from '@db/entities';

const options: DataSourceOptions & SeederOptions = {
  type: 'better-sqlite3',
  database: ':memory:',
  synchronize: true,
  entities: [...ENTITIES],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
};

export const dataSource = new DataSource(options);
