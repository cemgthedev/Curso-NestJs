import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * Exemplo de módulo dinâmico
 */
export const databases = (configService: ConfigService) => ({
  production: {
    type: configService.getOrThrow<'postgres'>('DATABASE_TYPE'),
    host: configService.getOrThrow<string>('DATABASE_HOST'),
    port: configService.getOrThrow<number>('DATABASE_PORT'),
    database: configService.getOrThrow<string>('DATABASE_DATABASE'),
    username: configService.getOrThrow<string>('DATABASE_USERNAME'),
    password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
    autoLoadEntities: false,
    synchronize: false,
  },
  test: {
    type: configService.getOrThrow<'postgres'>('DATABASE_TEST_TYPE'),
    host: configService.getOrThrow<string>('DATABASE_TEST_HOST'),
    port: configService.getOrThrow<number>('DATABASE_TEST_PORT'),
    database: configService.getOrThrow<string>('DATABASE_TEST_DATABASE'),
    username: configService.getOrThrow<string>('DATABASE_TEST_USERNAME'),
    password: configService.getOrThrow<string>('DATABASE_TEST_PASSWORD'),
    autoLoadEntities: true,
    synchronize: true,
  },
});

export type DatabaseType = keyof ReturnType<typeof databases>;

export type DBConnectModuleConfigs = {
  type: DatabaseType;
};

/**
 * Este módulo centraliza a configuração de conexões com diferentes bancos de dados
 * Obs: neste caso separando por type um banco que seria para produção e outro de testes
 */
@Module({})
export class DBConnectModule {
  static register(configs: DBConnectModuleConfigs): DynamicModule {
    return {
      module: DBConnectModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: (
            configService: ConfigService,
          ): TypeOrmModuleOptions => {
            return databases(configService)[configs.type];
          },
          inject: [ConfigService],
        }),
      ],
    };
  }
}
