import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { PrismaService } from '../../database/PrismaService';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: UserDTO) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      throw new Error('User already exists');
    }

    const user = await this.prisma.user.create({ data });

    return user;
  }

  async update(idUser: number, data: UserDTO) {
    idUser = Number(idUser);

    const userExists = await this.prisma.user.findUnique({
      where: {
        idUser,
      },
    });

    if (!userExists) {
      throw new Error('User not found');
    }

    const user = await this.prisma.user.update({
      where: {
        idUser,
      },
      data,
    });

    return user;
  }

  async delete(idUser: number) {
    idUser = Number(idUser);

    const userExists = await this.prisma.user.findUnique({
      where: {
        idUser,
      },
    });

    if (!userExists) {
      throw new Error('User not found');
    }

    const user = await this.prisma.user.delete({
      where: {
        idUser,
      },
    });

    return user;
  }
}
