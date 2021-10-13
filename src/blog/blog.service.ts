import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { BlogDto } from './dto/blog.dto';
import { BlogRo } from './dto/blog.ro';
import { BlogsRo } from './dto/blogs.ro';
import { BlogStateEnum } from './enum/blog-state.enum';
import { Blog } from './schemas/blog.schema';
import { ObjectID } from 'mongodb';
import { PermissionTag } from 'src/roles/enum/permission-tag.enum';
import { UserRolesService } from 'src/users/user-roles.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name)
    private blogModel: Model<Blog>,
    @Inject(UserRolesService)
    private userRolesService: UserRolesService,
  ) {}

  async create(blogCreateDto: BlogDto, writer: User): Promise<BlogRo> {
    try {
      const blogValue = { ...blogCreateDto, writer };
      const blog = await this.blogModel.create(blogValue);
      return plainToClass(BlogRo, await blog.save(), {
        excludeExtraneousValues: true,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async find(): Promise<BlogsRo> {
    const blogs = await this.blogModel
      .find({
        state: {
          $in: [BlogStateEnum.ACCEPTED],
        },
      })
      .populate('writer');
    return plainToClass(BlogsRo, { blogs }, { excludeExtraneousValues: true });
  }

  async findForAdmin(): Promise<BlogsRo> {
    const blogs = await this.blogModel.find().populate('writer');
    return plainToClass(BlogsRo, { blogs }, { excludeExtraneousValues: true });
  }

  async findUserBlogs(currentUser: User): Promise<BlogsRo> {
    const blogs = await this.blogModel
      .find({ writer: currentUser.id })
      .populate('writer');
    return plainToClass(BlogsRo, { blogs }, { excludeExtraneousValues: true });
  }

  async read(blogId: string): Promise<BlogRo> {
    if (!ObjectID.isValid(blogId)) {
      throw new NotFoundException();
    }
    const blog = await this.blogModel
      .findOne({ _id: blogId })
      .populate('writer');
    if (!blog) {
      throw new NotFoundException();
    }
    return plainToClass(BlogRo, blog, { excludeExtraneousValues: true });
  }

  async update(
    blogId: string,
    blogDto: BlogDto,
    currentUser: User,
  ): Promise<BlogRo> {
    if (!ObjectID.isValid(blogId)) {
      throw new NotFoundException();
    }
    await this.checkPermission(blogId, currentUser);
    const blog = await this.blogModel
      .findOneAndUpdate({ _id: blogId }, { $set: blogDto })
      .populate('writer');
    if (!blog) {
      throw new NotFoundException();
    }
    return plainToClass(BlogRo, await blog, {
      excludeExtraneousValues: true,
    });
  }

  async delete(blogId: string): Promise<void> {
    if (!ObjectID.isValid(blogId)) {
      throw new NotFoundException();
    }
    const del = await this.blogModel.deleteOne({ _id: blogId });
    if (!del.deletedCount) {
      throw new NotFoundException();
    }
  }

  async checkPermission(blogId: string, currentUser: User): Promise<void> {
    const blog = await this.read(blogId);
    try {
      await this.userRolesService.checkPermission({
        username: currentUser.username,
        permissions: [PermissionTag.ADMIN],
      });
      return;
    } catch {}
    if (blog.writer.username === currentUser.username) {
      return;
    }
    throw new ForbiddenException('You do not have permission');
  }
}
