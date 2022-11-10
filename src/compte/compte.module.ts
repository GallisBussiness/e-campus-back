import { Module } from '@nestjs/common';
import { CompteService } from './compte.service';
import { CompteController } from './compte.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Compte, CompteSchema } from './entities/compte.entity';

@Module({
  imports: [MongooseModule.forFeatureAsync([{name: Compte.name, useFactory: () => {
    const schema  = CompteSchema;
    schema.plugin(require('mongoose-autopopulate'));
    return schema;
  }}])],
  controllers: [CompteController],
  providers: [CompteService]
})
export class CompteModule {}
