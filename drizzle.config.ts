/** @format */

import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  schema: './src/schema/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url:
      process.env.DRIZZLE_DATABASE_URL! ||
      'postgresql://neondb_owner:KkR56pfzhuiW@ep-aged-bush-a5rcr5e6.us-east-2.aws.neon.tech/personal-protfolio?sslmode=require',
  },
  verbose: true,
  strict: true,
});
