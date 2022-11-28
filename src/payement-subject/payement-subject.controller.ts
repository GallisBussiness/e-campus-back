import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PayementSubjectService } from './payement-subject.service';
import { CreatePayementSubjectDto } from './dto/create-payement-subject.dto';
import { UpdatePayementSubjectDto } from './dto/update-payement-subject.dto';

@Controller('payement-subject')
export class PayementSubjectController {
  constructor(private readonly payementSubjectService: PayementSubjectService) {}

  @Post()
  create(@Body() createPayementSubjectDto: CreatePayementSubjectDto) {
    return this.payementSubjectService.create(createPayementSubjectDto);
  }

  @Get()
  findAll() {
    return this.payementSubjectService.findAll();
  }
  @Get('byservice/:id')
  findAllByService(@Param('id') id: string) {
    return this.payementSubjectService.findAllByService(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payementSubjectService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayementSubjectDto: UpdatePayementSubjectDto) {
    return this.payementSubjectService.update(id, updatePayementSubjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payementSubjectService.remove(id);
  }
}
