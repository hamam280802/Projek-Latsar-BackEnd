import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/users.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { response } from 'express';
import * as bcrypt from 'bcrypt';
import { console } from 'inspector';

interface UserData {
  name: string;
  email: string;
  password: string;
  phone_number: number;
}

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma:PrismaService,
    private readonly configService: ConfigService,
  ){}

  // register user
  async register(registerDto: RegisterDto, response: Response) {
    const {name, email, phone_number, password} = registerDto;
    const isEmailExist = await this.prisma.user.findUnique({
      where: {
        email,
        phone_number,
      },
    });

    const isPhoneNumberExist = await this.prisma.user.findUnique({
      where: {
        phone_number,
      },
    });

    if (isPhoneNumberExist) {
      throw new BadRequestException('User already exist with this phone number!');
    }

    if(isEmailExist) {
      throw new BadRequestException('User already exist with this email!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        name,
        email,
        phone_number,
        password: hashedPassword,
    };
    const activationToken = await this.createActivationToken(user);
    const activationCode = activationToken.activationCode;
    console.log(activationCode);
    return {user, response};
  }

  // create activation token
  async createActivationToken(user: UserData) {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = this.jwtService.sign(
      {user, activationCode},
      {
        secret: this.configService.get<string>('ACTIVATION_SECRET'),
        expiresIn: '10m',
      }
    );  
    return {token, activationCode};
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
