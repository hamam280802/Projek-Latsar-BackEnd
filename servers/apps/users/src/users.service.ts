import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    // private readonly prisma:
    private readonly configService: ConfigService,
  ){}

  // register user
  async register(registerDto: RegisterDto) {
    const {name, email, password} = registerDto;
    const user = {
      name,
      email,
      password,
    };
    return user;
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
    const users = [
      {
        id: 1,
        name: 'John Doe',
        email: '2808@bps.go.id',
        password: '12345678',
      }
    ]
    return users;
  }
}
