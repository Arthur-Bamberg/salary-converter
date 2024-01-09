import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { PrismaService } from '../../database/PrismaService';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: UserDTO) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    data.password = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({ data });

    return {
      ...user,
      password: undefined,
    };
  }

  async findOne(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(idUser: number, data: UserDTO) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        idUser,
      },
    });

    if (!userExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const user = await this.prisma.user.update({
      where: {
        idUser,
      },
      data,
    });

    return {
      ...user,
      password: undefined,
    };
  }

  async delete(idUser: number) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        idUser,
      },
    });

    if (!userExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const user = await this.prisma.user.delete({
      where: {
        idUser,
      },
    });

    return {
      ...user,
      password: undefined,
    };
  }
}
