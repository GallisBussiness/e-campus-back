import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EtudiantService } from './etudiant.service';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';
import { UpdateEtudiantDto } from './dto/update-etudiant.dto';

@Controller('etudiant')
export class EtudiantController {
  constructor(private readonly etudiantService: EtudiantService) {}

  @Post()
  create(@Body() createEtudiantDto: CreateEtudiantDto) {
    return this.etudiantService.create(createEtudiantDto);
  }

  @Get()
  findAll() {
    return this.etudiantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.etudiantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEtudiantDto: UpdateEtudiantDto) {
    return this.etudiantService.update(+id, updateEtudiantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.etudiantService.remove(+id);
  }
}
