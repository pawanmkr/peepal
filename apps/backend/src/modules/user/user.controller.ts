import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    Logger,
    Query,
    UseGuards,
    Req,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiQuery,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';
import { UUID } from 'node:crypto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { Request } from 'express';

@ApiTags('User Module')
@Controller('user')
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiQuery({
        name: 'offset',
        type: 'number',
        description: 'Offset of the list',
        required: true,
        example: 0,
    })
    @ApiQuery({
        name: 'limit',
        type: 'number',
        description: 'Limit of the list',
        required: true,
        example: 1000,
    })
    @ApiResponse({
        status: 200,
        description: 'List of all users.',
        type: [User],
    })
    @ApiResponse({ status: 404, description: 'Users not found.' })
    findAll(@Query('offset') offset: number, @Query('limit') limit: number) {
        return this.userService.findAll(offset, limit);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiParam({ name: 'id', description: 'User ID', type: String, format: 'uuid' })
    @ApiResponse({
        status: 200,
        description: 'User details.',
        type: User,
    })
    @ApiResponse({ status: 404, description: 'User not found.' })
    findOne(@Param('id') id: UUID) {
        return this.userService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a user by ID' })
    @ApiParam({ name: 'id', description: 'User ID', type: String, format: 'uuid' })
    @ApiResponse({
        status: 200,
        description: 'The user has been successfully updated.',
        type: User,
    })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    update(@Param('id') id: UUID, @Body() dto: UpdateUserDto, @Req() req: Request) {
        if (req.user.id !== id) {
            this.logger.error(`User ${req.user} is not allowed to update user ${id}`);
            return;
        }
        return this.userService.update(id, dto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a user by ID' })
    @ApiParam({ name: 'id', description: 'User ID', type: String, format: 'uuid' })
    @ApiResponse({
        status: 204,
        description: 'The user has been successfully deleted.',
    })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @HttpCode(204)
    remove(@Param('id') id: UUID, @Req() req: Request) {
        if (req.user.id !== id) {
            this.logger.error(`User ${req.user} is not allowed to delete user ${id}`);
            return;
        }
        this.logger.log(`User ${req.user} is deleting user ${id}`);
        return this.userService.remove(id);
    }
}
