import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop()
    id: number;

    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop()
    username: string;

    @Prop()
    balance: number;

    @Prop()
    photo_url: string;
}

export const UserSchema = SchemaFactory.createForClass(User);