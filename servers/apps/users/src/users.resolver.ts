import { BadRequestException, UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { ActivationResponse, LoginResponse, LogoutResponse, RegisterResponse } from "./types/users.types";
import { ActivationDto, RegisterDto } from "./dto/users.dto";
import { User } from "./entities/users.entity";
import { Response } from "express";
import { AuthGuard } from "./guards/auth.guard";



@Resolver('User')
// @UseFilters()
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService
    ) {}
    @Mutation(() => RegisterResponse)
    async register(
        @Args('registerDto') registerDto: RegisterDto,
        @Context() context: {res: Response},
    ) : Promise<RegisterResponse> {
        if(!registerDto.name || !registerDto.email || !registerDto.password) {
            throw new BadRequestException('Tolong isi semua kolom yang tersedia!');
        }

        const { activation_token } = await this.usersService.register(registerDto, context.res);

        return { activation_token };
    }

    @Mutation(() => ActivationResponse)
    async activateUser(
        @Args('activationDto') activationDto: ActivationDto,
        @Context() context: {res: Response},
    ) : Promise<ActivationResponse> {
        return await this.usersService.activateUser(activationDto, context.res);
    }

    @Mutation(() => LoginResponse)
    async Login(
        @Args('email') email: string,
        @Args('password') password: string,
    ): Promise<LoginResponse> {
        return await this.usersService.Login({email, password});
    }

    @Query(() => LoginResponse)
    @UseGuards(AuthGuard)
    async getLoggedInUser(@Context() context: {req: Request}) {
        return await this.usersService.getLoggedInUser(context.req);
    }

    @Query(() => LogoutResponse)
    @UseGuards(AuthGuard)
    async LogOutUser(@Context() context: {req: Request}) {
        return await this.usersService.Logout(context.req);
    }

    @Query(() => [User])
    async getUsers() {
        return this.usersService.getUsers();
    }
}