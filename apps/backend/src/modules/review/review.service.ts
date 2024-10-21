import { UUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v7 as uuidv7 } from 'uuid';

import { Review } from './review.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review)
        private readonly reviewModel: typeof Review,
        private readonly userServie: UserService
    ) {}

    async createReview(dto: CreateReviewDto): Promise<Review> {
        const { userId } = dto;

        const user = await this.userServie.findOne(userId);
        if (!user) throw new NotFoundException('User not found');

        const id = uuidv7() as UUID;
        let r = await this.reviewModel.create({ id, ...dto });

        return await this.getReviewById(r.id);
    }

    async getReviews(
        userId: UUID,
        offset: number,
        limit: number
    ): Promise<{ reviews: Review[]; total: number }> {
        const total = await this.reviewModel.count({ where: { userId } });
        if (total > 0) {
            let reviews = await this.reviewModel.findAll({
                where: { userId },
                attributes: [
                    'id',
                    'username',
                    'firstName',
                    'lastName',
                    'avatar',
                    'rating',
                    'comment',
                    'createdAt',
                    'updatedAt',
                ],
                offset,
                limit,
            });
            if (reviews.length === 0) {
                throw new NotFoundException('No reviews found for this professional');
            }
            reviews = reviews.map((r) => {
                return r.toJSON() as Review;
            });
            return { reviews, total };
        }
        return { reviews: [], total: 0 };
    }

    async getCurrentUserReviews(
        userId: UUID,
        offset: number,
        limit: number
    ): Promise<{ reviews: Review[]; total: number }> {
        const total = await this.reviewModel.count({ where: { userId } });
        if (total > 0) {
            const reviews = await this.reviewModel.findAll({
                where: { userId },
                attributes: ['id', 'rating', 'comment', 'createdAt', 'updatedAt'],
                offset,
                limit,
            });
            if (reviews.length === 0) {
                throw new NotFoundException('No reviews found for this user');
            }
            return { reviews, total };
        }
        return { reviews: [], total: 0 };
    }

    async getReviewById(reviewId: UUID): Promise<Review> {
        const review = await this.reviewModel.findByPk(reviewId, {
            include: {
                model: User,
                attributes: ['id', 'username', 'firstName', 'lastName', 'avatar'],
            },
            attributes: ['id', 'rating', 'comment', 'createdAt', 'updatedAt'],
        });
        if (!review) {
            throw new NotFoundException('Review not found');
        }
        return review;
    }

    async updateReview(reviewId: UUID, dto: CreateReviewDto): Promise<Review> {
        const review = await this.reviewModel.findByPk(reviewId);
        if (!review) {
            throw new NotFoundException('Review not found');
        }
        return await review.update({ ...dto });
    }

    async deleteReview(reviewId: UUID): Promise<void> {
        const review = await this.reviewModel.findByPk(reviewId);
        if (!review) {
            throw new NotFoundException('Review not found');
        }
        await review.destroy();
    }
}
