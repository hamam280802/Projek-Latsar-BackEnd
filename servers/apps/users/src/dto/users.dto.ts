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

    @Field()
    @IsNotEmpty({ message: 'Phone number is required' })
    @Min(12, { message: 'Phone number must be at least 12 characters long' })
    phone_number: number;
}

@InputType()
export class ActivationDto {
    @Field()
    @IsNotEmpty({ message: 'Activation Token is required' })
    activationToken: string;
    
    @Field()
    @IsNotEmpty({ message: 'Activation Code is required' })
    activationCode: string;
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