import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PayementSubjectService } from './payement-subject.service';
import { CreatePayementSubjectDto } from './dto/create-payement-subject.dto';
import { UpdatePayementSubjectDto } from './dto/update-payement-subject.dto';
import { CheckAbility } from 'src/casl/policy.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CaslGuard } from 'src/casl/casl.guard';
import { Action } from 'src/casl/casl-ability.factory';
import { User } from 'src/user/entities/user.entity';

@Controller('payement-subject')
export class PayementSubjectController {
  constructor(private readonly payementSubjectService: PayementSubjectService) {}

  @Post()
  create(@Body() createPayementSubjectDto: CreatePayementSubjectDto) {
    return this.payementSubjectService.create(createPayementSubjectDto);
  }

  @Get()
  @CheckAbility({ action: Action.Read, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  findAll() {
    return this.payementSubjectService.findAll();
  }
  @Get('byservice/:id')
  @CheckAbility({ action: Action.Read, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  findAllByService(@Param('id') id: string) {
    return this.payementSubjectService.findAllByService(id);
  }

  @Get(':id')
  @CheckAbility({ action: Action.Read, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  findOne(@Param('id') id: string) {
    return this.payementSubjectService.findOne(id);
  }

  @Patch(':id')
  @CheckAbility({ action: Action.Update, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  update(@Param('id') id: string, @Body() updatePayementSubjectDto: UpdatePayementSubjectDto) {
    return this.payementSubjectService.update(id, updatePayementSubjectDto);
  }

  @Delete(':id')
  @CheckAbility({ action: Action.Delete, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  remove(@Param('id') id: string) {
    return this.payementSubjectService.remove(id);
  }
}
