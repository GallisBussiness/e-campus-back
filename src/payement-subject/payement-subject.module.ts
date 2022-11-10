import { Module } from '@nestjs/common';
import { PayementSubjectService } from './payement-subject.service';
import { PayementSubjectController } from './payement-subject.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PayementSubject, PayementSubjectSchema } from './entities/payement-subject.entity';

@Module({
  imports: [MongooseModule.forFeatureAsync([{name: PayementSubject.name, useFactory: () => {
    const schema = PayementSubjectSchema;
    schema.plugin(require('mongoose-autopopulate'));
    return schema;
  }}])],
  controllers: [PayementSubjectController],
  providers: [PayementSubjectService]
})
export class PayementSubjectModule {}
