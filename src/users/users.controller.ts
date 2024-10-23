import {Controller, Get, Param} from '@nestjs/common';
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {
    }
    @Get()
    async findAll() {
        return this.userService.findAll()
    }

    @Get(":id")
    async getUserByID(@Param('id') id: string) {
        const user = await this.userService.findUser(id);
        return user;
    }
}
