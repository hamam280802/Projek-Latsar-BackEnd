import {InputType, Field} from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';

@InputType()
export class RegisterDto {
    @Field()
    @IsNotEmpty({ message: 'Nama belum diisi' })
    @IsString({ message: 'Nama harus berupa teks' })
    name: string;

    @Field()
    @IsNotEmpty ({ message: 'Password belum diisi' })
    @Min(8, { message: 'Password diisi minimal 8 karakter' })
    password: string;

    @Field()
    @IsNotEmpty({ message: 'Email belum diisi' })
    @IsEmail({}, { message: 'Format Email tidak sesuai' })
    email: string;

    @Field()
    @IsNotEmpty({ message: 'Nomor Telepon belum diisi' })
    @Min(12, { message: 'Nomor Telepon diisi minimal 12 angka' })
    phone_number: number;
}

@InputType()
export class ActivationDto {
    @Field()
    @IsNotEmpty({ message: 'Token Aktivasi harus diisi' })
    activationToken: string;
    
    @Field()
    @IsNotEmpty({ message: 'Kode Aktivasi harus diisi' })
    activationCode: string;
}

@InputType()
export class LoginDto {
    @Field()
    @IsNotEmpty({ message: 'Email harus diisi' })
    @IsEmail({}, { message: 'Format Email tidak sesuai' })
    email: string;

    @Field()
    @IsNotEmpty ({ message: 'Password harus diisi' })
    password: string;
}

@InputType()
export class ForgotPasswordDto {
    @Field()
    @IsNotEmpty({ message: 'Email harus diisi' })
    @IsEmail({}, { message: 'Format Email tidak sesuai' })
    email: string;
}

@InputType()
export class ResetPasswordDto {
    @Field()
    @IsNotEmpty({ message: 'Password baru harus diisi' })
    @Min(8, { message: 'Password baru diisi minimal 8 karakter' })
    password: string;

    @Field()
    @IsNotEmpty({ message: 'Kode Aktivasi harus diisi' })
    activationToken: string;
}