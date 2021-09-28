import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { MediaController } from './media.controller';

@Module({
  imports: [UsersModule],
  controllers: [MediaController],
})
export class MediaModule {}
