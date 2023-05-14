import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { FindDTO, RegisterDTO, RegisterSingleDTO } from 'src/user/register.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';
import { Payload } from 'src/types/payload';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('/onlyauth')
  @UseGuards(AuthGuard('jwt'))
  async hiddenInformation() {
    return 'hidden information';
  }
  @Get('/anyone')
  async publicInformation() {
    return 'this can be seen by anyone';
  }

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    const user = await this.userService.create(registerDTO);
    return user;
  }

  @Post('upload')
  async upload(@Body() registerDTO: RegisterDTO) {
    const user = await this.userService.upload(registerDTO);
    return user;
  }

  @Get('get')
  async get() {
    const user = await this.userService.get();
    return user;
  }

  @Post('find')
  async find(@Body() payload: FindDTO) {
    const user = await this.userService.findByPayload(payload)
    return user;
  }

  // @Post('login')
  // async login(@Body() loginDTO: LoginDTO) {
  //   const user = await this.userService.findByLogin(loginDTO);
  //   const payload = {
  //     email: user.email,
  //   };
  //   const token = await this.authService.signPayload(payload);
  //   return { user, token };
  // }
}
