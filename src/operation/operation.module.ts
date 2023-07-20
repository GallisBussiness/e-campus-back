import { Module, forwardRef } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationController } from './operation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Operation, OperationSchema } from './entities/operation.entity';
import { CompteModule } from 'src/compte/compte.module';
import { Compte, CompteSchema } from 'src/compte/entities/compte.entity';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [MongooseModule.forFeatureAsync([{name: Operation.name, useFactory: () => {
    const schema  = OperationSchema;
    schema.plugin(require('mongoose-autopopulate'));
    return schema;
  }},{name: Compte.name, useFactory: () => {
    const schema  = CompteSchema;
    schema.plugin(require('mongoose-autopopulate'));
    return schema;
  }}],'ecampus'),
 forwardRef(() => CompteModule),
 CaslModule
],
  controllers: [OperationController],
  providers: [OperationService],
  exports: [OperationService]
})
export class OperationModule {}
