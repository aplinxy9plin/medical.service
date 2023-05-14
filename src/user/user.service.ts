import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/types/user';
import { FindDTO, RegisterDTO, RegisterSingleDTO } from './register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from 'src/auth/login.dto';
import { Payload } from 'src/types/payload';
import { Reports } from 'src/types/reports';
import { defaultSchema } from 'src/shared/defaultSchema';
import { uuid } from 'uuidv4';
import { SearchService } from 'src/elastic/elastic.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Reports') private reportsModel: Model<Reports>,
    private readonly searchService: SearchService,
  ) {}

  async create(RegisterDTO: RegisterDTO) {
    const createdUser = new this.userModel(RegisterDTO);

    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async get() {
    const users = await this.userModel.find();

    return users;
  }

  async upload(RegisterDTO: RegisterDTO) {
    let currentSchema = await this.reportsModel.findOne({}, {}, { sort: { 'created_at' : -1 } })
    if(!currentSchema){
      currentSchema = await this.reportsModel.create({
        report: defaultSchema,
        reportVersion: 1,
      })
    }
    const createdUsers = await this.userModel.insertMany(RegisterDTO.users);
    RegisterDTO.users.forEach(async (element) => {
      element.report = element.report.map(item => ({ ...item, value: String(item.value) }))
      await this.searchService.indexData(element);
    });
    return createdUsers;
  }

  async findByPayload(payload: FindDTO) {
    return await this.userModel.find(payload);
  }

  // async findByLogin(UserDTO: LoginDTO) {
  //   const { email, password } = UserDTO;
  //   const user = await this.userModel.findOne({ email });
  //   if (!user) {
  //     throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
  //   }
  //   if (await bcrypt.compare(password, user.password)) {
  //     return this.sanitizeUser(user);
  //   } else {
  //     throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
  //   }
  // }
  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }
}
