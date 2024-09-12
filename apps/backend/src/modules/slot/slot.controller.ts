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
    HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

import { SlotService } from './slot.service';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { ValidateParam } from '../../common/decorators/validate-id.decorator';
import { UUID } from 'node:crypto';
import { validate as isValidUUID } from 'uuid';
import { UserRole } from '../../common/common.enum';

@ApiTags('Slot Module')
@Controller('slot')
export class SlotController {
    constructor(private readonly slotService: SlotService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new slot' })
    @ApiResponse({
        status: 201,
        description: 'The slot has been successfully created.',
        type: CreateSlotDto,
    })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    create(
        @Body() dto: CreateSlotDto,
        @Query('userId') userId?: string,
        @Query('professionalId') professionalId?: string
    ) {
        if (dto.userType === UserRole.TUTOR && isValidUUID(professionalId)) {
            dto.professionalId = professionalId;
            dto.userId = null;
        } else if (dto.userType === UserRole.USER && isValidUUID(userId)) {
            dto.userId = userId;
            dto.professionalId = null;
        } else {
            throw new BadRequestException('Invalid user or professional ID');
        }
        return this.slotService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all slots' })
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
        description: 'Successfully retrieved all slots.',
        type: [CreateSlotDto],
    })
    @ApiResponse({ status: 404, description: 'No slots found.' })
    findAll(@Query('offset') offset: number, @Query('limit') limit: number) {
        return this.slotService.findAll(offset, limit);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a slot by ID' })
    @ApiParam({ name: 'id', type: 'string', description: 'The ID of the slot to retrieve' })
    @ApiResponse({
        status: 200,
        description: 'Successfully retrieved the slot.',
        type: CreateSlotDto,
    })
    @ApiResponse({ status: 404, description: 'Slot not found.' })
    findOne(@ValidateParam('id') id: UUID) {
        return this.slotService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a slot by ID' })
    @ApiParam({ name: 'id', type: 'string', description: 'The ID of the slot to update' })
    @ApiResponse({
        status: 200,
        description: 'Successfully updated the slot.',
        type: UpdateSlotDto,
    })
    @ApiResponse({ status: 404, description: 'Slot not found.' })
    update(@ValidateParam('id') id: UUID, @Body() dto: UpdateSlotDto) {
        return this.slotService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a slot by ID' })
    @ApiParam({ name: 'id', type: 'string', description: 'The ID of the slot to delete' })
    @ApiResponse({ status: 204, description: 'Successfully deleted the slot.' })
    @ApiResponse({ status: 404, description: 'Slot not found.' })
    @HttpCode(204)
    async remove(@ValidateParam('id') id: UUID) {
        const removedRows = await this.slotService.remove(id);
        if (removedRows === 0) {
            throw new BadRequestException('Slot not found');
        }
        return;
    }
}
