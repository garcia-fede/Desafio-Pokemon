import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonesController } from './pokemones/pokemones.controller';
import { PokemonesModule } from './pokemones/pokemones.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PokemonesModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '/db/pokedb.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      migrations: ['dist/migrations/*.js'],
    }),
  ],
  controllers: [AppController, PokemonesController],
  providers: [AppService],
})
export class AppModule {}
