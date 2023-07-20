import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OperationService } from './operation.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { CompteService } from 'src/compte/compte.service';
import { VirementOperationDto } from './dto/virement-operation.dto';
import { CheckAbility } from 'src/casl/policy.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Action } from 'src/casl/casl-ability.factory';
import { User } from 'src/user/entities/user.entity';
import { CaslGuard } from 'src/casl/casl.guard';

@Controller('operation')
export class OperationController {
  constructor(private readonly operationService: OperationService, private readonly compteService: CompteService) {}

  @Post('depot')
  @CheckAbility({ action: Action.Create, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  async depot(@Body() createOperationDto: CreateOperationDto) {
    return await this.operationService.depot(createOperationDto);
  }

  @Post('retrait')
  @CheckAbility({ action: Action.Create, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  async retrait(@Body() createOperationDto: CreateOperationDto) {
    return this.operationService.retrait(createOperationDto);
  }

  @Post('virement')
  async virement(@Body() virementOperationDto: VirementOperationDto) {
    const payloadFrom = {compte: virementOperationDto.id_from, montant: virementOperationDto.montant, isVirement: true};
    const payloadTo = {compte: virementOperationDto.id_to, montant: virementOperationDto.montant, isVirement: true};
    await this.operationService.retrait(payloadFrom)
    await this.operationService.depot(payloadTo);
    return true;
  }

  @Get()
  findAll() {
    return this.operationService.findAll();
  }

  @Get('/compte/:id')
  findAllByCompte(@Param('id') id: string) {
    return this.operationService.findAllByCompte(id);
  }

  @Get('/compte/latest/:id')
  findLatestByCompte(@Param('id') id: string) {
    return this.operationService.findLatestByCompte(id);
  }

  @Get('count')
  count() {
    return this.operationService.count();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operationService.findOne(id);
  }

  @Patch(':id')
  @CheckAbility({ action: Action.Manage, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  update(@Param('id') id: string, @Body() updateOperationDto: UpdateOperationDto) {
    return this.operationService.update(id, updateOperationDto);
  }

  @Delete(':id')
  @CheckAbility({ action: Action.Manage, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  remove(@Param('id') id: string) {
    return this.operationService.remove(id);
  }
}
