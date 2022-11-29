import { Module } from '@nestjs/common';
import { PubService } from './pub.service';
import { PubController } from './pub.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { Pub, PubSchema } from './entities/pub.entity';
import { diskStorage } from 'multer';


const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/pubs');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + '-' + file.originalname,
    );
  },
});

@Module({
  imports: [
    MongooseModule.forFeature([{name: Pub.name, schema: PubSchema}]),
    MulterModule.register({
      storage
    })
  ],
  controllers: [PubController],
  providers: [PubService]
})
export class PubModule {}
