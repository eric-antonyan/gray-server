import { Module } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { LevelsController } from './levels.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/user.model';
import { Level, LevelSchema } from './level.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: Level.name,
        schema: LevelSchema
      }
    ])
  ],
  providers: [LevelsService],
  controllers: [LevelsController]
})
export class LevelsModule {}
