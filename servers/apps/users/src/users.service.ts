import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/users.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma:PrismaService,
    private readonly configService: ConfigService,
  ){}

  // register user
  async register(registerDto: RegisterDto, response: Response) {
    const {name, email, password} = registerDto;
    const isEmailExist = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if(isEmailExist) {
      throw new BadRequestException('User already exist with this email!');
    }
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return {user, response};
  }

  // login service
  async Login(LoginDto:LoginDto) {
    const {email, password} = LoginDto;
    const user = {
      email,
      password,
    };
    return user;
  }

  // get all users service
  async getUsers() {
    return this.prisma.user.findMany({});
  }
}
