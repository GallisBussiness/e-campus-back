import { Module, forwardRef } from '@nestjs/common';
import { CompteService } from './compte.service';
import { CompteController } from './compte.controller';
import { MongooseModule } from '@nestjs/mongoose'; 
import { Compte, CompteSchema } from './entities/compte.entity';
import { OperationModule } from 'src/operation/operation.module';
import { Etudiant, EtudiantSchema } from 'src/etudiant/entities/etudiant.entity';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [MongooseModule.forFeature([{name: Compte.name, schema: CompteSchema}],'ecampus'),
  MongooseModule.forFeature([{name: Etudiant.name, schema: EtudiantSchema}],'etudiant'),
  forwardRef(() => OperationModule),
  CaslModule
],
  controllers: [CompteController],
  providers: [CompteService],
  exports: [CompteService],
})
export class CompteModule {}
     