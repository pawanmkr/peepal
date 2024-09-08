import { z } from "zod";

// Define the schema for environment variables
const envSchema = z.object({
  VITE_PORT: z.coerce.number().min(1000).default(3000), // Default port if not provided
  VITE_ENV: z
    .union([
      z.literal("development"),
      z.literal("testing"),
      z.literal("production"),
    ])
    .default("development"),
  VITE_API_BASE_URL: z.string().url(),
});

// Access environment variables using import.meta.env
const env = envSchema.parse({
  VITE_PORT: Number(import.meta.env.VITE_PORT) || 3000,
  VITE_ENV: import.meta.env.VITE_ENV || "development",
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
});

// Declare the types for the environment variables
declare global {
  interface ImportMetaEnv extends z.infer<typeof envSchema> {}
}

export default env;
