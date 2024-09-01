import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model'; // Adjust the import path accordingly

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@ApiOperation({ summary: 'Create a new user' })
	@ApiResponse({
		status: 201,
		description: 'The user has been successfully created.',
		type: User,
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	@Post()
	create(@Body() dto: CreateUserDto) {
		return this.userService.create(dto);
	}

	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({
		status: 200,
		description: 'List of all users.',
		type: [User],
	})
	@ApiResponse({
		status: 404,
		description: 'Users not found.',
	})
	@Get()
	findAll() {
		return this.userService.findAll();
	}

	@ApiOperation({ summary: 'Get a user by ID' })
	@ApiParam({ name: 'id', description: 'User ID', type: String })
	@ApiResponse({
		status: 200,
		description: 'User details.',
		type: User,
	})
	@ApiResponse({ status: 404, description: 'User not found.' })
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.userService.findOne(+id);
	}

	@ApiOperation({ summary: 'Update a user by ID' })
	@ApiParam({ name: 'id', description: 'User ID', type: String })
	@ApiResponse({
		status: 200,
		description: 'The user has been successfully updated.',
		type: User,
	})
	@ApiResponse({ status: 400, description: 'Bad request.' })
	@ApiResponse({ status: 404, description: 'User not found.' })
	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
		return this.userService.update(+id, dto);
	}

	@ApiOperation({ summary: 'Delete a user by ID' })
	@ApiParam({ name: 'id', description: 'User ID', type: String })
	@ApiResponse({
		status: 204,
		description: 'The user has been successfully deleted.',
	})
	@ApiResponse({ status: 404, description: 'User not found.' })
	@HttpCode(204)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(+id);
	}
}
