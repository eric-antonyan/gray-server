import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class Quiz {
    @Prop()
    uuid: string;

    @Prop()
    title: string;

    @Prop()
    background: string;

    @Prop()
    inDevelopment: boolean;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);