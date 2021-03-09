import { ConfigService } from '@nestjs/config';
import { User } from './users/user.entity';
import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { UserData } from './shared/decorators/user-data.decorator';
import { promises as fs } from 'fs';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@UserData() user: User) {
    return user;
  }

  @Get('api')
  async getDocs(@Query('secret') secret: string) {
    const storedSecret = await this.configService.get<string>(
      'API_DOCS_SECRET',
    );

    if (!secret) {
      throw new BadRequestException();
    }

    if (secret !== storedSecret) {
      throw new UnauthorizedException();
    }

    const docs = await fs.readFile('./src/generated/api.json', 'utf-8');
    return JSON.parse(docs);
  }
}
