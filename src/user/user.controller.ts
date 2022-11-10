import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { Action } from 'src/casl/casl-ability.factory';
import { CaslGuard } from 'src/casl/casl.guard';
import { User } from './entities/user.entity';
import { CheckAbility } from 'src/casl/policy.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req): Promise<any> {
    return this.authService.login(req.user);
  }

  // @CheckAbility({ action: Action.Create, subject: User })
  // @UseGuards(AuthGuard('jwt'), CaslGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('many')
  async createMany(@Body() createUserDto: CreateUserDto[]) {
    return this.userService.createMany(createUserDto);
  }

  @CheckAbility({ action: Action.Read, subject: User })
  @UseGuards(CaslGuard)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @CheckAbility({ action: Action.Read, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @CheckAbility({ action: Action.Update, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @CheckAbility({ action: Action.Delete, subject: User })
  @UseGuards(AuthGuard('jwt'), CaslGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
