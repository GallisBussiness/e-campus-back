import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { PubService } from './pub.service';
import { CreatePubDto } from './dto/create-pub.dto';
import { UpdatePubDto } from './dto/update-pub.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { unlinkSync } from 'fs';

@Controller('pub')
export class PubController {
  constructor(private readonly pubService: PubService) {}

  @Post()
  @UseInterceptors(FileInterceptor('audio'))
  create(@UploadedFile( new ParseFilePipe({
    validators: [
      new FileTypeValidator({ fileType: 'mp4' }),
    ]
  })) file: Express.Multer.File,@Body() createPubDto: CreatePubDto) {
    createPubDto.audio = file.filename;
    return this.pubService.create(createPubDto);
  }

  @Get()
  findAll() {
    return this.pubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pubService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('audio'))
  async update(@UploadedFile( new ParseFilePipe({
    validators: [
      new FileTypeValidator({ fileType: 'mp4' }),
    ]
  })) file: Express.Multer.File,@Param('id') id: string, @Body() updatePubDto: UpdatePubDto) {
    updatePubDto.audio = file.filename;
    const prevpub =  await this.pubService.update(id, updatePubDto);
    if(prevpub)
    unlinkSync(`uploads/pubs/${prevpub.audio}`);

    return prevpub;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedPub = await this.pubService.remove(id);
    if(deletedPub)
    unlinkSync(`uploads/pubs/${deletedPub.audio}`);

    return deletedPub;
  }
}
