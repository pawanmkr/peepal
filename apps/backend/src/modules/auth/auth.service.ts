import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { Injectable, BadRequestException, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UUID } from 'node:crypto';
import { v7 as uuidv7 } from 'uuid';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/user.model';
import { JwtPayload } from '../../common/jwt-payload.interface';
import { env } from '../../config/env.config';
import { UserRole } from '../../common/common.enum';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User
    ) {}

    private generateToken(payload: JwtPayload): string {
        return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1h' });
    }

    async register(registerDto: RegisterDto): Promise<{ token: string }> {
        const { username, email, password } = registerDto;

        const existingUser = await this.userModel.findOne({
            where: { [Op.or]: [{ email }, { username }] },
        });
        if (existingUser) throw new BadRequestException('Username or email already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({
            id: uuidv7() as UUID,
            ...registerDto,
            password: hashedPassword,
        });

        const token = this.generateToken({ id: user.id });
        return { token };
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, username, password } = loginDto;
        if (!email && !username) throw new BadRequestException('Email or username is required');

        let options = {};
        if (email) options = { email };
        else options = { username };

        const user = await this.userModel.findOne({
            where: { [Op.or]: [options] },
        });
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) throw new UnauthorizedException('Invalid credentials');

        const token = this.generateToken({ id: user.id });
        return { token };
    }

    async refreshJwt(user: User): Promise<{ token: string }> {
        const existingUser = await this.userModel.findByPk(user.id);
        const token = this.generateToken({ id: existingUser.id });
        return { token };
    }

    async getProfile(user: User): Promise<User> {
        return this.userModel.findByPk(user.id, {
            attributes: { exclude: ['password'] },
        });
    }

    async checkUsername(username: string): Promise<{ available: boolean }> {
        const user = await this.userModel.findOne({ where: { username } });
        return { available: !user };
    }

    async verifyToken(token: string): Promise<User> {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
            const user = await this.userModel.findByPk(decoded.id);
            if (!user) throw new UnauthorizedException('Invalid token');
            return user;
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                throw new UnauthorizedException(error.message);
            } else {
                throw new UnauthorizedException('Invalid Token');
            }
        }
    }
}
