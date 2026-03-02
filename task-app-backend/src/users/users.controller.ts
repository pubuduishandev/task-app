import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.usersService.register(data);
  }

  @Post('login')
  login(@Body() data: LoginDto) {
    return this.usersService.login(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return this.usersService.getProfile(req.user.userId);
  }
}