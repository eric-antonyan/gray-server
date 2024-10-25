import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Level {
  @Prop({required: true})
  id: string;

  @Prop({required: true})
  quizId: string;

  @Prop({required: true})
  level: number;
}

export const LevelSchema = SchemaFactory.createForClass(Level);