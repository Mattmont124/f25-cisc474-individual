import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseSync } from 'node:sqlite';
import { PrismaService } from '../prisma.service';


@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtStrategy, AuthService, PrismaService],
  controllers: [AuthController],
  exports: [PassportModule],
})
export class AuthModule {}
