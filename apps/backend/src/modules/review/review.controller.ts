import {
    Controller,
    Post,
    Body,
    Param,
    Get,
    Delete,
    ParseUUIDPipe,
    HttpCode,
    Query,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './review.model';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { UUID } from 'node:crypto';

@ApiTags('Reviews') // This groups endpoints in Swagger under 'Reviews'
@Controller('review') // Pluralized route for RESTful design
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new review for a user.' }) // Operation summary for Swagger
    @ApiResponse({
        status: 201,
        description: 'Review successfully created.',
        type: Review, // Response type is Review model
    })
    @ApiResponse({ status: 404, description: 'User or user not found.' })
    async createReview(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
        const review = await this.reviewService.createReview(createReviewDto);
        return review.toJSON() as Review;
    }

    @Get('/user/:id')
    @ApiOperation({ summary: 'Get all reviews for a specific user.' })
    @ApiParam({ name: 'id', description: 'UUID of the user', type: String, format: 'uuid' })
    @ApiQuery({
        name: 'offset',
        description: 'Offset for pagination',
        type: Number,
        required: false,
    })
    @ApiQuery({ name: 'limit', description: 'Limit for pagination', type: Number, required: false })
    @ApiResponse({
        status: 200,
        description: 'List of reviews retrieved successfully.',
        schema: {
            properties: {
                reviews: { type: 'array', items: { $ref: 'Review' } },
                total: { type: 'number' },
            },
        },
    })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async getReviewsByUser(
        @Param('id', ParseUUIDPipe) id: UUID,
        @Query('offset') offset: number,
        @Query('limit') limit: number
    ) {
        return await this.reviewService.getReviews(id, offset, limit);
    }

    /*     @Get('/user/:id')
    @ApiOperation({ summary: 'Get all reviews by a specific user.' })
    @ApiParam({ name: 'id', description: 'UUID of the user', type: String, format: 'uuid' })
    @ApiResponse({
        status: 200,
        description: 'List of reviews retrieved successfully.',
        schema: {
            properties: {
                reviews: { type: 'array', items: { $ref: 'Review' } },
                total: { type: 'number' },
            },
        },
    })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async getReviewsByUser(
        @Param('id', ParseUUIDPipe) id: UUID,
        @Query('offset') offset: number = 0,
        @Query('limit') limit: number = 5
    ) {
        return await this.reviewService.getCurrentUserReviews(id, offset, limit);
    } */

    @Get(':id')
    @ApiOperation({ summary: 'Get a review by its ID.' })
    @ApiParam({ name: 'id', description: 'UUID of the review', type: String, format: 'uuid' })
    @ApiResponse({
        status: 200,
        description: 'Review details retrieved successfully.',
        type: Review,
    })
    @ApiResponse({ status: 404, description: 'Review not found.' })
    async getReviewById(@Param('id', ParseUUIDPipe) id: UUID): Promise<Review> {
        const review = await this.reviewService.getReviewById(id);
        return review.toJSON() as Review;
    }

    @Delete(':id')
    @HttpCode(204) // No content response status code for successful deletion
    @ApiOperation({ summary: 'Delete a review by its ID.' })
    @ApiParam({
        name: 'id',
        description: 'UUID of the review to be deleted',
        type: String,
        format: 'uuid',
    })
    @ApiResponse({ status: 204, description: 'Review successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Review not found.' })
    async deleteReview(@Param('id', ParseUUIDPipe) id: UUID): Promise<void> {
        await this.reviewService.deleteReview(id);
    }
}
