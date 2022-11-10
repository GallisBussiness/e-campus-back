/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService){}
  use(req: Request, res: Response, next: NextFunction) {
    if(req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      if(token === 'null') throw new ForbiddenException('not provide a valid token');
      const decoded = this.jwtService.decode(token) as User;
      const { email,prenom,nom, role, _id } = decoded;
      req.user = { email,prenom,nom,role, _id };
    }
    next();
  }
}
