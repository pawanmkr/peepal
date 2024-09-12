import { UUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v7 as uuidv7 } from 'uuid';

import { Review } from './review.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { Professional } from '../professional/models/professional.model';
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
        const { userId, professionalId } = dto;
        const professional = await Professional.findByPk(professionalId);
        if (!professional) {
            throw new NotFoundException('Professional not found');
        }
        const user = await this.userServie.findOne(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return await this.reviewModel.create({
            id: uuidv7() as UUID,
            ...dto,
        });
    }

    async getReviewsByProfessional(
        professionalId: UUID,
        offset: number,
        limit: number
    ): Promise<{ reviews: Review[]; total: number }> {
        const total = await this.reviewModel.count({ where: { professionalId } });
        if (total > 0) {
            const reviews = await this.reviewModel.findAll({
                where: { professionalId },
                include: {
                    model: User,
                    attributes: ['id', 'username', 'firstName', 'lastName', 'avatar'],
                },
                attributes: ['id', 'rating', 'comment', 'createdAt', 'updatedAt'],
                offset,
                limit,
            });
            if (reviews.length === 0) {
                throw new NotFoundException('No reviews found for this professional');
            }
            return { reviews, total: reviews.length };
        }
        return { reviews: [], total: 0 };
    }

    async getReviewsByUser(
        userId: UUID,
        offset: number,
        limit: number
    ): Promise<{ reviews: Review[]; total: number }> {
        const total = await this.reviewModel.count({ where: { userId } });
        if (total > 0) {
            const reviews = await this.reviewModel.findAll({
                where: { userId },
                include: {
                    model: Professional,
                    attributes: ['id', 'username', 'firstName', 'lastName', 'avatar'],
                },
                attributes: ['id', 'rating', 'comment', 'createdAt', 'updatedAt'],
                offset,
                limit,
            });
            if (reviews.length === 0) {
                throw new NotFoundException('No reviews found for this user');
            }
            return { reviews, total: reviews.length };
        }
        return { reviews: [], total: 0 };
    }

    async getReviewById(reviewId: UUID): Promise<Review> {
        const review = await this.reviewModel.findByPk(reviewId, { include: [User, Professional] });
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
