import { Module } from '@nestjs/common';
import { EtudiantService } from './etudiant.service';
import { EtudiantController } from './etudiant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Etudiant, EtudiantSchema } from './entities/etudiant.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: Etudiant.name, schema: EtudiantSchema}])],
  controllers: [EtudiantController],
  providers: [EtudiantService]
})
export class EtudiantModule {}
