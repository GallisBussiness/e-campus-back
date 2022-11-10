import { Module } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationController } from './operation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Operation, OperationSchema } from './entities/operation.entity';

@Module({
  imports: [MongooseModule.forFeatureAsync([{name: Operation.name, useFactory: () => {
    const schema  = OperationSchema;
    schema.plugin(require('mongoose-autopopulate'));
    return schema;
  }}])],
  controllers: [OperationController],
  providers: [OperationService]
})
export class OperationModule {}
