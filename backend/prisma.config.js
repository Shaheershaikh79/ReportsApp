import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    // ✅ Safely use environment variable, with fallback for local testing
    url: process.env.DATABASE_URL,
  },
});
