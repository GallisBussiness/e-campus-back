import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceSchema } from './entities/service.entity';
import { CaslModule } from 'src/casl/casl.module';
import { PayementSubjectModule } from 'src/payement-subject/payement-subject.module';

@Module({
  imports: [MongooseModule.forFeature([{name: Service.name, schema: ServiceSchema}],'ecampus'), CaslModule,PayementSubjectModule],
  controllers: [ServiceController],
  providers: [ServiceService]
})
export class ServiceModule {}
