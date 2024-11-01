import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbconfig = config.get('db');
export const typeOrmconfig: TypeOrmModuleOptions = {
  type: dbconfig.type,
  host: process.env.RDS_HOST || dbconfig.host,
  port: process.env.RDS_PORT || dbconfig.port,
  username: process.env.RDS_USERNAME || dbconfig.username,
  password: process.env.RDS_PASSWORD || dbconfig.password,
  database: process.env.DB_NAME || dbconfig.db_name,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: process.env.TYPEORM_SYNC || dbconfig.synchronize,
};
