import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CompteService } from './compte.service';
import { CompteUpdatePassDto } from './dto/compte-update-pass-dto';
import { CompteLoginDto } from './dto/compteLoginDto';
import { CreateCompteDto } from './dto/create-compte.dto';
import { UpdateCompteDto } from './dto/update-compte.dto';
import { CheckAbility } from 'src/casl/policy.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CaslGuard } from 'src/casl/casl.guard';
import { Action } from 'src/casl/casl-ability.factory';
import { User } from 'src/user/entities/user.entity';

@Controller('compte')
export class CompteController {
  constructor(private readonly compteService: CompteService) {}

  @Post()
  @CheckAbility({ action: Action.Create, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
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
  @CheckAbility({ action: Action.Read, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  findAll() {
    return this.compteService.findAll();
  }

  @Get('count')
  count() {
    return this.compteService.count();
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
  @CheckAbility({ action: Action.Update, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  update(@Param('id') id: string, @Body() updateCompteDto: UpdateCompteDto) {
    return this.compteService.update(id, updateCompteDto);
  }

  @Delete(':id')
  @CheckAbility({ action: Action.Delete, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  remove(@Param('id') id: string) {
    return this.compteService.remove(id);
  }
}
