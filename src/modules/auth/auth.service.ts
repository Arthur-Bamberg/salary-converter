import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findOne(username);
    if (await bcrypt.compare(pass, user.password)) {
      return {
        ...user,
        password: undefined,
      };
    }
    return null;
  }
}
