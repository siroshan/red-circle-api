import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

//all data should be in env file
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'tiny.db.elephantsql.com',
      port: 5432,
      database: 'houonrcz',
      username: 'houonrcz',
      password: 'TcGVkOBQVbMAxG505NzEk_9VN2eAYgC-',
      autoLoadEntities: true,
      synchronize: true, // never use TRUE in production!
    };
  }
}
