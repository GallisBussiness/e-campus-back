import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceSchema } from './entities/service.entity';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [MongooseModule.forFeature([{name: Service.name, schema: ServiceSchema}],'ecampus'), CaslModule],
  controllers: [ServiceController],
  providers: [ServiceService]
})
export class ServiceModule {}
