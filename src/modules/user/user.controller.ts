import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: UserDTO) {
    return this.userService.create(data);
  }

  @Put(':idUser')
  async update(@Param('idUser') idUser: number, @Body() data: UserDTO) {
    return this.userService.update(idUser, data);
  }

  @Delete(':idUser')
  async delete(@Param('idUser') idUser: number) {
    return this.userService.delete(idUser);
  }
}
