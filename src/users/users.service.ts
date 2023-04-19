import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(createUserDto.password, salt);
    const user = new User();
    user.firstname = createUserDto.firstName;
    user.email = createUserDto.email.toLowerCase();
    user.lastname = createUserDto.lastName;
    user.password = hashedPassword;
    this.usersRepo.save(user);
    return user;
  }
}
