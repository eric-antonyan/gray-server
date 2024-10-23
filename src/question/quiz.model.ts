import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class Quiz {
    @Prop()
    uuid: string;

    @Prop()
    title: string;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);