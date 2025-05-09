import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../entities/users.entity';

@ObjectType()
export class ErrorType {
    @Field()
    message: string;

    @Field({nullable: true })
    code?: string;
}

@ObjectType()
export class RegisterResponse {
    @Field()
    activation_token: string;

    @Field(() => ErrorType, { nullable: true })
    error?: ErrorType;
}

@ObjectType()
export class ActivationResponse {
    @Field(() => User)
    user: User | any;

    @Field(() => ErrorType, { nullable: true })
    error?: ErrorType;
}

@ObjectType()
export class LoginResponse {
    @Field(() => User, {nullable: true })
    user?: User | null;

    @Field(() => String, {nullable: true })
    accessToken?: string | null;

    @Field(() => String, {nullable: true })
    refreshToken?: string | null;
    
    @Field(() => ErrorType, { nullable: true })
    error?: ErrorType;
}

@ObjectType()
export class LogoutResponse {
    @Field()
    message?: string;
}

@ObjectType()
export class ForgotPasswordResponse {
    @Field()
    message: string;

    @Field(() => ErrorType, { nullable: true })
    error?: ErrorType;
}

@ObjectType()
export class ResetPasswordResponse {
    @Field(() => User)
    user: User | any;

    @Field(() => ErrorType, { nullable: true })
    error?: ErrorType;
}