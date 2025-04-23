import {InputType, Field} from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';

@InputType()
export class RegisterDto {
    @Field()
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name: string;

    @Field()
    @IsNotEmpty ({ message: 'Password is required' })
    @Min(8, { message: 'Password must be at least 8 characters long' })
    password: string;

    @Field()
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;
}

@InputType()
export class LoginDto {
    @Field()
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @Field()
    @IsNotEmpty ({ message: 'Password is required' })
    password: string;
}