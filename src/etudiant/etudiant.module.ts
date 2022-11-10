import { Module } from '@nestjs/common';
import { EtudiantService } from './etudiant.service';
import { EtudiantController } from './etudiant.controller';

@Module({
  controllers: [EtudiantController],
  providers: [EtudiantService]
})
export class EtudiantModule {}
