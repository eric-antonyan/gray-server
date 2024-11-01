import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class Question {
    @Prop({type: [String]})
    answers: string[];

    @Prop()
    task: string;

    @Prop()
    correct: number

    @Prop()
    group: string;

    @Prop()
    image: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);