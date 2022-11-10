import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompteService } from './compte.service';
import { CreateCompteDto } from './dto/create-compte.dto';
import { UpdateCompteDto } from './dto/update-compte.dto';

@Controller('compte')
export class CompteController {
  constructor(private readonly compteService: CompteService) {}

  @Post()
  create(@Body() createCompteDto: CreateCompteDto) {
    return this.compteService.create(createCompteDto);
  }

  @Get()
  findAll() {
    return this.compteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompteDto: UpdateCompteDto) {
    return this.compteService.update(id, updateCompteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compteService.remove(id);
  }
}
