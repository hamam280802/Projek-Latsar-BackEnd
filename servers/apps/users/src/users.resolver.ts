import { BadRequestException, Query } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { RegisterRepose } from "./types/users.types";
import { RegisterDto } from "./dto/users.dto";



@Resolver('User')
// @UseFilters()
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService
    ) {}
    @Mutation(() => RegisterRepose)
    async register(
        @Args('registerInput') registerDto: RegisterDto,
        // @Context() context: {res: Response},
    ) : Promise<RegisterRepose> {
        if(!registerDto.name || !registerDto.email || !registerDto.password) {
            throw new BadRequestException('Please fill all fields!');
        }

        const user = await this.usersService.register(registerDto);

        return { user };
    }

    @Query(() => [User])
    async getUsers() {
        return this.usersService.getUsers();
    }
}