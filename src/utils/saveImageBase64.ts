import { HttpException, HttpStatus } from "@nestjs/common";
import * as Jimp from "jimp";
import { v4 } from "uuid";

export const  saveImageBase64 = (base64Str)  => {
    const matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

    if (matches.length !== 3) 
    {
        throw new HttpException('unable to resize img', HttpStatus.INTERNAL_SERVER_ERROR, {cause: new Error('Invalid input string')});
    }

    const buffer = Buffer.from(matches[2], "base64");
    const destname = 'uploads/avatars/' + v4()+'-'+ Date.now()+'.jpg';
    return new Promise((resolve,reject) => {
            Jimp.read(buffer, (err, res) => {
                if (err) reject(err);
                res
                .autocrop()
                .cover(256,256) 
                .quality(60).write(destname);
                resolve(destname);
                });
    });
   
}