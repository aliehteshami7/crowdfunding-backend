import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserFindDto } from './dto/user-find.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { UserRo } from './dto/user.ro';
import { UserUpdateDto } from './dto/user-update.dto';
import { UsernameDto } from './dto/username.dto';
import { UsersRo } from './dto/users.ro';
import { plainToClass } from 'class-transformer';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PreconditionFailedException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(userCreateDto: UserCreateDto): Promise<UserRo> {
    try {
      const { password, ...userData } = userCreateDto;
      const user = await this.userModel.create(userData);
      user.isActive = true;
      await user.setPassword(password);
      return plainToClass(UserRo, await user.save(), {
        excludeExtraneousValues: true,
      });
    } catch (err) {
      console.log(err);
      if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate username
        throw new UnprocessableEntityException({
          message: 'Username already exist!',
        });
      }
      throw err;
    }
  }

  async update(userUpdateDto: UserUpdateDto): Promise<void> {
    const { username } = userUpdateDto;
    const user = await this.userModel.findOneAndUpdate(
      { username },
      userUpdateDto,
    );
    if (!user) {
      throw new NotFoundException();
    }
  }

  async find(userFindDto: UserFindDto): Promise<UsersRo> {
    return {
      users: plainToClass(
        UserRo,
        await this.userModel.find(userFindDto).populate('roles'),
        {
          excludeExtraneousValues: true,
        },
      ),
    };
  }

  async findUserByUsername(username: string): Promise<UserRo> {
    return plainToClass(
      UserRo,
      await this.userModel.findOne({ username }).populate('roles'),
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async suspend(usernameDto: UsernameDto): Promise<void> {
    const user = await this.userModel.findOneAndUpdate(usernameDto, {
      isActive: false,
    });
    if (!user) {
      throw new NotFoundException();
    }
  }
  async activate(usernameDto: UsernameDto): Promise<void> {
    const user = await this.userModel.findOneAndUpdate(usernameDto, {
      isActive: true,
    });
    if (!user) {
      throw new NotFoundException();
    }
  }

  async delete(usernameDto: UsernameDto): Promise<void> {
    const user = await this.userModel.deleteOne(usernameDto);
    if (!user) {
      throw new NotFoundException();
    }
  }

  async validate(username: string, password: string): Promise<UserRo> {
    const user = await this.userModel.findOne({ username }).populate('roles');
    if (!user) {
      throw new UnauthorizedException();
    }

    if (!user.isActive) {
      throw new PreconditionFailedException();
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      throw new UnauthorizedException();
    }

    return plainToClass(UserRo, user, { excludeExtraneousValues: true });
  }
}
