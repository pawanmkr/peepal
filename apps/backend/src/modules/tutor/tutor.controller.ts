import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    BadRequestException,
    NotFoundException,
    HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { UUID } from 'node:crypto';
import { validate } from 'uuid';

import { TutorService } from './tutor.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { Tutor } from './models/tutor.model';

@ApiTags('Tutors')
@Controller('tutor')
export class TutorController {
    constructor(private readonly tutorService: TutorService) {}

    private validateUUID(id: string) {
        if (!validate(id)) throw new BadRequestException('Invalid user ID');
    }

    @ApiOperation({ summary: 'Create a new tutor' })
    @ApiQuery({ name: 'user', type: 'string', description: 'Unique identifier of the user UUID' })
    @ApiResponse({
        status: 201,
        description: 'The tutor has been successfully created.',
        type: Tutor,
    })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    @Post()
    create(@Body() dto: CreateTutorDto, @Query('user') userId: string) {
        this.validateUUID(userId);
        return this.tutorService.create(dto, userId as UUID);
    }

    @ApiOperation({ summary: 'Retrieve all tutors' })
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
    @ApiResponse({ status: 200, description: 'List of all tutors', type: [Tutor] })
    @ApiResponse({ status: 404, description: 'No tutors found' })
    @Get()
    findAll(@Query('offset') offset: number, @Query('limit') limit: number) {
        return this.tutorService.findAll(offset, limit);
    }

    @ApiOperation({ summary: 'Retrieve a tutor by ID' })
    @ApiParam({ name: 'id', type: 'string', description: 'Unique identifier of the tutor' })
    @ApiResponse({ status: 200, description: 'The tutor details', type: Tutor })
    @ApiResponse({ status: 404, description: 'Tutor not found' })
    @Get(':id')
    async findOne(@Param('id') id: string) {
        this.validateUUID(id);
        const tutor = await this.tutorService.findOne(id as UUID);
        if (!tutor) throw new NotFoundException(`Tutor with id: ${id} not found`);
        return tutor;
    }

    @ApiOperation({ summary: 'Update tutor details' })
    @ApiParam({ name: 'id', type: 'string', description: 'Unique identifier of the tutor' })
    @ApiBody({ type: UpdateTutorDto })
    @ApiResponse({ status: 200, description: 'The updated tutor details', type: Tutor })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    @ApiResponse({ status: 404, description: 'Tutor not found' })
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateTutorDto) {
        this.validateUUID(id);
        return this.tutorService.update(id as UUID, dto);
    }

    @ApiOperation({ summary: 'Delete a tutor by ID' })
    @ApiParam({ name: 'id', type: 'string', description: 'Unique identifier of the tutor' })
    @ApiResponse({ status: 204, description: 'The tutor has been successfully deleted' })
    @ApiResponse({ status: 404, description: 'Tutor not found' })
    @HttpCode(204)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        this.validateUUID(id);
        const rows = await this.tutorService.remove(id as UUID);
        console.log(rows);
        if (rows === 0) throw new NotFoundException(`Tutor with id: ${id} not found`);
        return;
    }
}
