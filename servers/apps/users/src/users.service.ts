import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { ActivationDto, LoginDto, RegisterDto } from './dto/users.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { EmailService } from './email/email.service';
import { TokenSender } from './utils/sendToken';

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
    private readonly emailService: EmailService,
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
      throw new BadRequestException('Nomor telepon ini sudah dipakai!');
    }

    if(isEmailExist) {
      throw new BadRequestException('Email ini sudah dipakai!');
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
    const activation_token = activationToken.token;

    await this.emailService.sendMail({
      email,
      subject: 'Aktivasi akun mu',
      template: './activation-mail',
      name,
      activationCode,
    })
    return {activation_token, response};
  }

  // create activation token
  async createActivationToken(user: UserData) {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = this.jwtService.sign(
      {user, activationCode},
      {
        secret: this.configService.get<string>('ACTIVATION_SECRET'),
        expiresIn: '5m',
      }
    );  
    return {token, activationCode};
  }

  // activation user
  async activateUser (activationDto:ActivationDto, response: Response) {
    const {activationToken, activationCode} = activationDto;

    const newUser: {user: UserData, activationCode: string} = this.jwtService.verify(
      activationToken,
      {secret: this.configService.get<string>('ACTIVATION_SECRET')} as JwtVerifyOptions
    ) as {user: UserData, activationCode: string};

    if(newUser.activationCode !== activationCode) {
      throw new BadRequestException('Kode Aktivasi tidak sesuai!');
    }

    const {name, email, password, phone_number} = newUser.user;
    const existUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if(existUser) {
      throw new BadRequestException('Akun ini sudah tersedia!');
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        phone_number,
      },
    });

    return {user, response};
  }

  // login service
  async Login(LoginDto:LoginDto) {
    const {email, password} = LoginDto;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if(user && (await this.comparePassword(password, user.password))) {
      const tokenSender = new TokenSender(this.configService, this.jwtService);
      return tokenSender.sendToken(user);
    } else {
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        error: {
          message: 'Email atau Password tidak sesuai!',
        },
      };
    }
  }

  //compare with hashed password
  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  //get logged in user
  async getLoggedInUser(req:any) {
    const user = req.user;
    const accessToken = req.accesstoken;
    const refreshToken = req.refreshtoken;
    console.log({user, accessToken, refreshToken});
    return {user, accessToken, refreshToken};
  } 

  // get all users service
  async getUsers() {
    return this.prisma.user.findMany({});
  }
}
