import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { configService } from './config.service';
import { RolesModule } from './roles/roles.module';
import { MediaModule } from './media/media.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    MongooseModule.forRoot(configService.getMongooseConfig()),
    UsersModule,
    AuthModule,
    RolesModule,
    MediaModule,
    ProjectModule,
  ],
})
export class AppModule {}
