import { Body, Controller, Param, Post, UseGuards, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthCredentailsDto } from './dto/auth-credentials.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // making it accessible to requests without tokens
  @Public()
  @Post('/signup')
  signUp(@Body() userDto: CreateUserDto): Promise<User> {
    return this.authService.signUp(userDto);
  }

  @Public()
  //The route handler will only be invoked if the user
  //has been validated by local strategy
  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentailsDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto, response);
  }

  @Public()
  @Post('/:email')
  validte(@Param('email') email: string): Promise<{ email: string }> {
    return this.authService.checkAvailabelUser(email);
  }
}
