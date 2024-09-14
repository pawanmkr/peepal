import { Controller, Get, Post, Body, Patch, Delete, Query, Param } from '@nestjs/common';
import { UUID } from 'node:crypto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiParam } from '@nestjs/swagger';

import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ValidateParam } from '../../common/decorators/validate-id.decorator';

@ApiTags('session')
@Controller('session')
export class SessionController {
    constructor(private readonly sessionService: SessionService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new session' })
    @ApiQuery({ name: 'userId', type: String, description: 'User ID' })
    @ApiQuery({ name: 'professionalId', type: String, description: 'Professional ID' })
    @ApiBody({ type: CreateSessionDto, description: 'Session creation payload' })
    @ApiResponse({ status: 201, description: 'The session has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    create(
        @Body() dto: CreateSessionDto,
        @ValidateParam('userId') userId: UUID,
        @ValidateParam('professionalId') professionalId: UUID
    ) {
        return this.sessionService.create(dto, userId, professionalId);
    }

    @Get()
    @ApiOperation({ summary: 'Retrieve all sessions' })
    @ApiQuery({ name: 'userId', type: String, required: false, description: 'Filter by user ID' })
    @ApiQuery({
        name: 'professionalId',
        type: String,
        required: false,
        description: 'Filter by professional ID',
    })
    @ApiResponse({ status: 200, description: 'List of sessions retrieved successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    findAll(@Query('userId') userId?: UUID, @Query('professionalId') professionalId?: UUID) {
        return this.sessionService.findAll(userId, professionalId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retrieve a session by ID' })
    @ApiParam({ name: 'id', type: String, description: 'Session ID' })
    @ApiResponse({ status: 200, description: 'Session retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'Session not found.' })
    findOne(@Param('id') id: UUID) {
        return this.sessionService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a session by ID' })
    @ApiParam({ name: 'id', type: String, description: 'Session ID' })
    @ApiBody({ type: UpdateSessionDto, description: 'Session update payload' })
    @ApiResponse({ status: 200, description: 'Session updated successfully.' })
    @ApiResponse({ status: 404, description: 'Session not found.' })
    update(@Param('id') id: UUID, @Body() dto: UpdateSessionDto) {
        return this.sessionService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a session by ID' })
    @ApiParam({ name: 'id', type: String, description: 'Session ID' })
    @ApiResponse({ status: 200, description: 'Session removed successfully.' })
    @ApiResponse({ status: 404, description: 'Session not found.' })
    remove(@Param('id') id: UUID) {
        return this.sessionService.remove(id);
    }
}
