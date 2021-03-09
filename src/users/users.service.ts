import { LoginDto } from './dtos/login.dto';
import { AuthService } from './../auth/auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const hashedPassword = await this.authService.hashPassword(password);

    const res = await this.usersRepository.insert({
      ...createUserDto,
      password: hashedPassword,
    });

    const userId: number = res.identifiers[0].id;
    const user = await this.usersRepository.findOne(userId);

    return this.authService.generateToken(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findById(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.usersRepository.findOne({ email: loginDto.email });
    if (!user) {
      throw new UnauthorizedException('Denne brukeren eksisterer ikke');
    }

    const passwordValid = await this.authService.comparePassword(
      loginDto.password,
      user.password,
    );

    if (!passwordValid) {
      throw new UnauthorizedException(
        'Passordet er ikke korrekt',
        'user.invalidPassword',
      );
    }

    return this.authService.generateToken(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
