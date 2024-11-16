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
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('User Module')
@Controller('user')
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(private readonly userService: UserService) {}

    @Get('/recommendations')
    @ApiOperation({ summary: 'Get recommended users for a specific user' })
    @ApiQuery({
        name: 'userId',
        type: 'uuid',
        description: 'user for which the recommendation needs to be fetched',
        required: false,
    })
    @ApiQuery({
        name: 'offset',
        type: 'number',
        description: 'Offset of the recommendations list',
        required: true,
        example: 0,
    })
    @ApiQuery({
        name: 'limit',
        type: 'number',
        description: 'Limit of the recommendations list',
        required: true,
        example: 25,
    })
    @ApiResponse({
        status: 200,
        description: 'List of recommended users.',
        type: [User],
    })
    @ApiResponse({ status: 404, description: 'User or recommendations not found.' })
    recommendedUsers(
        @Query('userId') userId: UUID,
        @Query('offset') offset: number,
        @Query('limit') limit: number
    ) {
        if (userId) this.logger.log(`Fetching recommendations for user ${userId}`);
        return this.userService.getRecommendedUsers(userId, offset, limit);
    }

    @Get('/search')
    @ApiOperation({ summary: 'Search for users based on a query string' })
    @ApiQuery({
        name: 'q',
        type: 'string',
        description: 'Search query to match user data',
        required: true,
        example: 'John',
    })
    @ApiQuery({
        name: 'offset',
        type: 'number',
        description: 'Offset of the search results list',
        required: true,
        example: 0,
    })
    @ApiQuery({
        name: 'limit',
        type: 'number',
        description: 'Limit of the search results list',
        required: true,
        example: 10,
    })
    @ApiResponse({
        status: 200,
        description: 'List of users matching the search query.',
        type: [User],
    })
    @ApiResponse({ status: 404, description: 'No users found matching the query.' })
    search(
        @Query('q') query: string,
        @Query('offset') offset: number,
        @Query('limit') limit: number
    ) {
        this.logger.log(`Searching for users with query: ${query}`);
        return this.userService.search(query, offset, limit);
    }

    @Post()
    // @UseGuards(JwtAuthGuard)
    // @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({
        status: 201,
        description: 'The user has been successfully created.',
        type: User,
    })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    create(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
        this.logger.log(`User ${req.user} is creating a new user`);
        return this.userService.create(createUserDto);
    }

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
    // @UseGuards(JwtAuthGuard)
    // @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a user by ID' })
    @ApiParam({ name: 'id', description: 'User ID', type: String, format: 'uuid' })
    @ApiResponse({
        status: 200,
        description: 'The user has been successfully updated.',
        type: User,
    })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    update(@Param('id') id: UUID, @Body() dto: UpdateUserDto) {
        return this.userService.update(id, dto);
    }

    @Delete(':id')
    // @UseGuards(JwtAuthGuard)
    // @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a user by ID' })
    @ApiParam({ name: 'id', description: 'User ID', type: String, format: 'uuid' })
    @ApiResponse({
        status: 204,
        description: 'The user has been successfully deleted.',
    })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @HttpCode(204)
    remove(@Param('id') id: UUID, @Req() req: Request) {
        this.logger.log(`User ${req.user} is deleting user ${id}`);
        return this.userService.remove(id);
    }
}
