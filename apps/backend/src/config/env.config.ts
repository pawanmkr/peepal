import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    APP_VERSION: z.string().regex(/^\d+\.\d+\.\d+$/),
    APP_HOST: z.string().min(3),
    APP_PORT: z.string().transform(Number),
    APP_URL: z.string().url(),

    // SESSION_SECRET: z.string().min(8).max(100),

    FRONTEND_URL: z.string().min(1),

    // redis
    // REDIS_HOST: z.string().min(1),
    // REDIS_PORT: z.string().transform(Number),
    // REDIS_PASSWORD: z.string().min(1),

    // Database
    DB_HOST: z.string().min(1),
    DB_USER: z.string().min(1),
    DB_PASSWORD: z.string().min(1),
    DB_NAME: z.string().min(1),

    // Google OAuth
    // GOOGLE_CLIENT_ID: z.string().min(1),
    // GOOGLE_CLIENT_SECRET: z.string().min(1),
    // GOOGLE_REDIRECT_URI: z.string().url(),

    // Github OAuth
    // GITHUB_CLIENT_ID: z.string().min(1),
    // GITHUB_CLIENT_SECRET: z.string().min(1),

    // Email
    // COMMUNICATION_SERVICES_CONNECTION_STRING: z.string().min(1),
    // SENDER_EMAIL: z.string().min(1),

    // Azure Blob Storage
    // AZURE_STORAGE_CONNECTION_STRING: z.string().min(1),
    // AZURE_STORAGE_CONTAINER_NAME: z.string().min(1),
});
export const env = envSchema.parse(process.env);
export type EnvVariables = z.infer<typeof envSchema>;
