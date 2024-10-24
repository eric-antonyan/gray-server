import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Level {
  @Prop()
  id: string;

  @Prop()
  quizId: string;

  @Prop()
  level: number;
}

export const LevelSchema = SchemaFactory.createForClass(Level);