import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller('health')
export class AppController {
    constructor() {}

    @ApiOperation({ summary: 'Check API health' })
    @ApiResponse({ status: 200, description: 'API is running' })
    @Get()
    checkHealth() {
        return { message: 'API is running' };
    }
}
