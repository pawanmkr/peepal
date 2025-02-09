import { Controller, Post, Body, UseGuards, Get, Req, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('Auth Module')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User successfully registered.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @ApiResponse({ status: 409, description: 'Username or email already exists.' })
    create(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 200, description: 'User successfully logged in.' })
    @ApiResponse({ status: 401, description: 'Invalid credentials.' })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('refresh-jwt')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Refresh JWT on client side' })
    @ApiResponse({ status: 200, description: 'New JWT generated successfully' })
    @ApiResponse({ status: 401, description: 'Invalid credentials.' })
    refreshJwt(@Req() req: Request) {
        return this.authService.refreshJwt(req.user);
    }

    @Get('profile')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get user profile' })
    @ApiResponse({ status: 200, description: 'Profile successfully retrieved.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    getProfile(@Req() req: Request) {
        return this.authService.getProfile(req.user);
    }

    @Get('check-username')
    @ApiOperation({ summary: 'Check if username is available' })
    @ApiResponse({
        status: 200,
        description: 'Username is available.',
        schema: {
            type: 'object',
            properties: {
                available: {
                    type: 'boolean',
                    example: true,
                },
            },
        },
    })
    @ApiResponse({ status: 409, description: 'Username already exists.' })
    checkUsername(@Query('username') username: string) {
        return this.authService.checkUsername(username);
    }
}
