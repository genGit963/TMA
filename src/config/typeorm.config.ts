import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'mahesh',
  password: 'mahesh',
  database: 'tma_database',
  entities: [__dirname + '/../**/*.entity.ts'],
  synchronize: true,
};
