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
    const compte = await this.compteService.findOne(createOperationDto.compte);
    const res = await this.operationService.depot(createOperationDto);
    if(res) {
        const c = await this.compteService.update(compte._id, {solde: compte.solde + createOperationDto.montant})
        return c ? res : false;
    }
    return false;
  }

  @Post('retrait')
  async retrait(@Body() createOperationDto: CreateOperationDto) {
    const compte = await this.compteService.findOne(createOperationDto.compte);
    const res = await this.operationService.retrait(createOperationDto);
    if(res) {
        const c = await this.compteService.update(compte._id, {solde: compte.solde - createOperationDto.montant})
        return c ? res : false;
    }
    return false;
  }

  @Post('virement')
  async virement(@Body() virementOperationDto: VirementOperationDto) {
    const compteFrom = await this.compteService.findOne(virementOperationDto.id_from);
    const compteTo = await this.compteService.findOne(virementOperationDto.id_to);
    const payloadFrom = {compte: virementOperationDto.id_from, montant: virementOperationDto.montant, isVirement: true};
    const payloadTo = {compte: virementOperationDto.id_to, montant: virementOperationDto.montant, isVirement: true};
    if(await this.operationService.retrait(payloadFrom)){
      const c = await this.compteService.update(compteFrom._id, {solde: compteFrom.solde - virementOperationDto.montant})
      if(c) {
        const d =  await this.operationService.depot(payloadTo);
        if(d) {
          const u = await this.compteService.update(compteTo._id, {solde: compteTo.solde + virementOperationDto.montant})
          return u ? d: false
        }
      }

    }
   return false; 
  }

  @Get()
  findAll() {
    return this.operationService.findAll();
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
