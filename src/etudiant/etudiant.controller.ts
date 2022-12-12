import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { EtudiantService } from './etudiant.service';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';
import { UpdateEtudiantDto } from './dto/update-etudiant.dto';
import { saveImageBase64 } from 'src/utils/saveImageBase64';
import { unlinkSync } from 'fs';

@Controller('etudiant')
export class EtudiantController {
  constructor(private readonly etudiantService: EtudiantService) {}

  @Post()
  async create(@Body() createEtudiantDto: CreateEtudiantDto) {
    let destname;
    try {
     destname = await saveImageBase64(createEtudiantDto.avatar);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {cause: error});
    }
    createEtudiantDto.avatar = destname;
    return this.etudiantService.create(createEtudiantDto);
  }

  @Get()
  findAll() {
    return this.etudiantService.findAll();
  }
  
  @Get('count')
  count() {
    return this.etudiantService.count();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.etudiantService.findOne(id);
  }

  @Get('/nce/:nce')
  findOneByNce(@Param('nce') nce: string) {
    return this.etudiantService.findOneByNce(nce);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEtudiantDto: UpdateEtudiantDto) {
    return this.etudiantService.update(id, updateEtudiantDto);
  }

  @Patch('updateavatar/:id')
  async updateAvatar(@Param('id') id: string, @Body() updateAv: {avatar: string}) {
    let destname;
    try {
     destname = await saveImageBase64(updateAv.avatar);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {cause: error});
    }
    updateAv.avatar = destname;
    const et = await this.etudiantService.update(id, updateAv);
    if(et)
    unlinkSync(et.avatar);
    return et;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const et = await this.etudiantService.remove(id);
    if(et)
    unlinkSync(et.avatar);
    return et;
  }
}
