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

import { ProfessionalService } from './professional.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { Professional } from './models/professional.model';

@ApiTags('Professionals')
@Controller('professional')
export class ProfessionalController {
    constructor(private readonly professionalService: ProfessionalService) {}

    private validateUUID(id: string) {
        if (!validate(id)) throw new BadRequestException('Invalid user ID');
    }

    @ApiOperation({ summary: 'Create a new professional' })
    @ApiQuery({ name: 'user', type: 'string', description: 'Unique identifier of the user UUID' })
    @ApiResponse({
        status: 201,
        description: 'The professional has been successfully created.',
        type: Professional,
    })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    @Post()
    create(@Body() dto: CreateProfessionalDto, @Query('user') userId: string) {
        this.validateUUID(userId);
        return this.professionalService.create(dto, userId as UUID);
    }

    @ApiOperation({ summary: 'Retrieve all professionals' })
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
        example: 10,
    })
    @ApiResponse({ status: 200, description: 'List of all professionals', type: [Professional] })
    @ApiResponse({ status: 404, description: 'No professionals found' })
    @Get()
    findAll(@Query('offset') offset: number, @Query('limit') limit: number = 10) {
        return this.professionalService.findAll(offset, limit);
    }

    @ApiOperation({ summary: 'Search for Professionals' })
    @ApiQuery({
        name: 'q',
        type: 'string',
        description: 'Search query',
        required: true,
        example: 'math',
    })
    @ApiQuery({
        name: 'offset',
        type: 'number',
        description: 'Offset of the list',
        required: false,
        example: 0,
    })
    @ApiQuery({
        name: 'limit',
        type: 'number',
        description: 'Limit of the list',
        required: false,
        example: 10,
    })
    @ApiResponse({
        status: 200,
        description: 'List of professionals',
        schema: {
            properties: {
                professionals: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Professional' },
                },
                total: { type: 'number' },
            },
        },
    })
    @Get('search')
    search(
        @Query('q') query: string,
        @Query('offset') offset: number = 0,
        @Query('limit') limit: number = 10
    ): Promise<{ professionals: Professional[]; total: number }> {
        return this.professionalService.search(query, offset, limit);
    }

    @ApiOperation({ summary: 'Retrieve a professional by ID' })
    @ApiParam({ name: 'id', type: 'string', description: 'Unique identifier of the professional' })
    @ApiResponse({ status: 200, description: 'The professional details', type: Professional })
    @ApiResponse({ status: 404, description: 'Professional not found' })
    @Get(':id')
    async findOne(@Param('id') id: string) {
        this.validateUUID(id);
        const professional = await this.professionalService.findOne(id as UUID);
        if (!professional) throw new NotFoundException(`Professional with id: ${id} not found`);
        return professional;
    }

    @ApiOperation({ summary: 'Update professional details' })
    @ApiParam({ name: 'id', type: 'string', description: 'Unique identifier of the professional' })
    @ApiBody({ type: UpdateProfessionalDto })
    @ApiResponse({
        status: 200,
        description: 'The updated professional details',
        type: Professional,
    })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    @ApiResponse({ status: 404, description: 'Professional not found' })
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateProfessionalDto) {
        this.validateUUID(id);
        return this.professionalService.update(id as UUID, dto);
    }

    @ApiOperation({ summary: 'Delete a professional by ID' })
    @ApiParam({ name: 'id', type: 'string', description: 'Unique identifier of the professional' })
    @ApiResponse({ status: 204, description: 'The professional has been successfully deleted' })
    @ApiResponse({ status: 404, description: 'Professional not found' })
    @HttpCode(204)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        this.validateUUID(id);
        const rows = await this.professionalService.remove(id as UUID);
        console.log(rows);
        if (rows === 0) throw new NotFoundException(`Professional with id: ${id} not found`);
        return;
    }
}
