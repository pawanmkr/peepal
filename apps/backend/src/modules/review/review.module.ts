import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { UserService } from '../user/user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from './review.model';
import { User } from '../user/user.model';

@Module({
    imports: [SequelizeModule.forFeature([Review, User])],
    controllers: [ReviewController],
    providers: [ReviewService, UserService],
})
export class ReviewModule {}
