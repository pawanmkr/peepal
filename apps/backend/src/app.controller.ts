import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cache } from './common/redis.cache';

@ApiTags('Health Check')
@Controller('')
export class AppController {
    constructor(private readonly cache: Cache) {}

    @Get('health')
    @ApiOperation({ summary: 'Check API health' })
    @ApiResponse({ status: 200, description: 'API is running' })
    checkHealth() {
        return { message: 'API is running' };
    }

    @ApiOperation({ summary: 'Fetch recently searched keywords' })
    @ApiResponse({ status: 200, description: 'Successfully fetched recent searches' })
    @Get('recent-searches')
    async getRecentSearches() {
        const keywords = await this.cache.getKeywords();
        return { keywords };
    }
}
