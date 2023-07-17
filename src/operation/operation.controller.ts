import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OperationService } from './operation.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { CompteService } from 'src/compte/compte.service';
import { VirementOperationDto } from './dto/virement-operation.dto';

@Controller('operation')
export class OperationController {
  constructor(private readonly operationService: OperationService, private readonly compteService: CompteService) {}

  @Post('depot')
  async depot(@Body() createOperationDto: CreateOperationDto) {
    return await this.operationService.depot(createOperationDto);
  }

  @Post('retrait')
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
  update(@Param('id') id: string, @Body() updateOperationDto: UpdateOperationDto) {
    return this.operationService.update(id, updateOperationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operationService.remove(id);
  }
}
