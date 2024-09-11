import { Redis } from 'ioredis';
import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { env } from '../config/env.config';

@Injectable()
export class Cache implements OnModuleDestroy {
    private readonly logger = new Logger(Cache.name);
    private readonly redis: Redis;
    private readonly SESSION_DURATION = 600; // Default TTL
    private readonly MAX_RECENT_SEARCHES = 10;

    constructor() {
        this.redis = new Redis({
            connectionName: env.REDIS_CONNECTION_NAME,
            db: env.REDIS_DB_INDEX,
            host: env.REDIS_HOST,
            port: env.REDIS_PORT,
        });
        // Set up event listeners for Redis client
        this.redis.on('connect', () => this.logger.log('Redis connected successfully'));
        this.redis.on('error', (error) => this.logger.error('Redis error', error));
        this.redis.on('ready', () => this.logger.log('Redis is ready'));
        this.redis.on('end', () => this.logger.log('Redis connection closed'));
    }

    async set(key: string, value: string): Promise<void> {
        try {
            await this.redis.set(key, value);
            this.logger.log(`Set key ${key} successfully.`);
        } catch (error) {
            this.logger.fatal(`Failed to set key ${key}`, error);
        }
    }

    async setWithTtl(key: string, value: string, ttl: number = this.SESSION_DURATION) {
        try {
            await this.redis.set(key, value, 'EX', ttl);
            this.logger.log(`Set key ${key} with TTL ${ttl} seconds successfully.`);
        } catch (error) {
            this.logger.fatal(`Failed to set key ${key} with TTL ${ttl}`, error);
        }
    }

    async get(key: string): Promise<string | null> {
        try {
            const value = await this.redis.get(key);
            this.logger.log(`Retrieved value for key ${key}.`);
            return value;
        } catch (error) {
            this.logger.fatal(`Failed to get key ${key}`, error);
            return null;
        }
    }

    async delete(key: string): Promise<void> {
        try {
            await this.redis.del(key);
            this.logger.log(`Deleted key ${key} successfully.`);
        } catch (error) {
            this.logger.fatal(`Failed to delete key ${key}`, error);
        }
    }

    async flush(): Promise<void> {
        try {
            await this.redis.flushdb();
            this.logger.log('Flushed all keys from the database successfully.');
        } catch (error) {
            this.logger.fatal('Failed to flush the redis database', error);
        }
    }

    async onModuleDestroy(): Promise<void> {
        try {
            await this.redis.quit();
            this.logger.log('Redis connection closed successfully.');
        } catch (error) {
            this.logger.fatal('Failed to close Redis connection', error);
        }
    }

    async addKeyword(keyword: string) {
        try {
            await this.redis.lpush('recent_searches', keyword);
            this.logger.log(`Added keyword: ${keyword}`);
        } catch (error) {
            this.logger.error(`Failed to add keyword: ${keyword}`, error);
        }
    }

    async getKeywords(): Promise<string[]> {
        try {
            const keywords = await this.redis.lrange('recent_searches', 0, -1);
            this.logger.log(`Retrieved recent_searches: ${keywords}`);
            return keywords;
        } catch (error) {
            this.logger.error('Failed to get recent_searches', error);
            return [];
        }
    }
}
