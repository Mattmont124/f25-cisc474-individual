import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard('jwt')) // Protect all routes with JWT Auth
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get all users
  @Get()
  findAll(@CurrentUser() user) {
    console.log('Authenticated user:', user);
    return this.userService.findAll();
  }

  // Get a specific user by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(String(id));
  }

  // Get the current authenticated user's info
  @Get('me')
  getCurrentUser(@CurrentUser() user) {
    return user;
  }
}