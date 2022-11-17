import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompteService } from './compte.service';
import { CompteUpdatePassDto } from './dto/compte-update-pass-dto';
import { CompteLoginDto } from './dto/compteLoginDto';
import { CreateCompteDto } from './dto/create-compte.dto';
import { UpdateCompteDto } from './dto/update-compte.dto';

@Controller('compte')
export class CompteController {
  constructor(private readonly compteService: CompteService) {}

  @Post()
  create(@Body() createCompteDto: CreateCompteDto) {
    return this.compteService.create(createCompteDto);
  }

  @Post('login')
  login(@Body() compteLoginDto: CompteLoginDto) {
    return this.compteService.login(compteLoginDto);
  }

  @Post('changepassword/:id')
  changepassword(@Param('id') id: string, @Body() compteUpdatePassDto: CompteUpdatePassDto) {
    return this.compteService.changepassword(id,compteUpdatePassDto);
  }

  @Get()
  findAll() {
    return this.compteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compteService.findOne(id);
  }

  @Get('/code/:code')
  findOneByCode(@Param('code') code: string) {
    return this.compteService.findOneByCode(code);
  }

  @Get('/etudiant/:id')
  findOneByEtudiant(@Param('id') id: string) {
    return this.compteService.findOneByEtudiant(id);
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
