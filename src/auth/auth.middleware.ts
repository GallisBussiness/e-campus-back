/* eslint-disable prettier/prettier */
import { ForbiddenException, HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { User } from 'src/user/entities/user.entity';

const authoriedKeys = ["b5909d77-6712-4982-9641-40acb07bfeb4"];


@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService){}
  use(req: Request, res: Response, next: NextFunction) {
    if(req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      if(!authoriedKeys.includes(token)) {
        try {
        const decoded = this.jwtService.verify(token) as User;
        const { email,prenom,nom, role, _id } = decoded;
        req.user = { email,prenom,nom,role, _id };
      } catch (error) {
        throw new HttpException("Authentication failed", 440);
      }
      }
      
      // if(token === 'null') throw new ForbiddenException('not provide a valid token');
    }
    next();
  }
}
