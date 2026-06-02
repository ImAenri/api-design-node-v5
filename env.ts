import { env as loadEnv } from 'custom-env';
import { z } from 'zod'; // Typescript for runtime

process.env.APP_STAGE = process.env.APP_STAGE || 'dev'; // Default to 'dev' if not set

// Different env files for different stages
const isProduction = process.env.APP_STAGE === 'production'; 
const isDevelopment = process.env.APP_STAGE === 'dev';
const isTesting = process.env.APP_STAGE === 'test';

if (isDevelopment) {
  loadEnv(); // Loads .env
} else if (isTesting) {
  loadEnv('test'); // Loads .env.test
}

// Define the schema for our environment variables
const envSchema = z.object({
  NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'), // For libraries that check NODE_ENV
  APP_STAGE: z
      .enum(['dev', 'test', 'production'])
      .default('dev'), // Our own variable to control app stage
  PORT: z
      .coerce.number().positive().default(3000), // Coerce to number and ensure it's positive
  DATABASE_URL: z
      .string().startsWith('postgresql://'), // Must be a string that starts with 'postgresql://'
  JWT_SECRET: z
      .string().min(32, 'Must be 32 chars long'), // Must be at least 32 characters
  JWT_EXPIRES_IN: z
      .string().default('7d'), // Default expiration time for JWTs
  BCRYPT_ROUNDS: z
      .coerce.number().min(10).max(20).default(12), // Default number of bcrypt rounds
})

export type Env = z.infer<typeof envSchema>; // TypeScript type for our env
let env: Env;

try { 
  env = envSchema.parse(process.env); // Validate and parse env vars
} catch (e) {
  if (e instanceof z.ZodError) {
    console.log('Invalid env var');
    console.error(JSON.stringify(e.flatten().fieldErrors, null, 2)); // Print detailed errors
    e.issues.forEach((err) => {
      const path = err.path.join('.');
      console.log(`${path}: ${err.message}`); // Print each error in a readable format
    });
    process.exit(1); // Exit with error code
  }

  throw e; // Re-throw if it's not a ZodError
}

// Helper functions to check the current environment
export const isProd = () => env.APP_STAGE === 'production';
export const isDev = () => env.APP_STAGE === 'dev';
export const isTest = () => env.APP_STAGE === 'test';

export { env };
export default env;