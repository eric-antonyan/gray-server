import {BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "./user.model";
import {Model} from "mongoose";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findAll() {
        return this.userModel.find()
    }

    async findUser(id: string) {
        if (isNaN(Number(id))) {
            throw new BadRequestException({
                message: `ID must be integer, try again`
            })
            return
        }
        const user = await this.userModel.findOne({ id });

        if (!user) {
            throw new NotFoundException({
                message: `User with id ${id} not found in database`,
            });
        }

        return user;
    }
}
