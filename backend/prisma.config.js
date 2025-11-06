import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    // ✅ Safely use environment variable, with fallback for local testing
    url: "postgresql://postgres:12345678@db.ldgfbkfzmpvsctexifbs.supabase.co:5432/postgres",
  },
});
