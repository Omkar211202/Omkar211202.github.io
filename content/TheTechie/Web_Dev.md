---
title: Building a Complete website (Complaint Management System)
date:
  - 2024-12-06
tags:
  - WebDev
image: /Resources/tech.jpg
keywords: complaint management system, full-stack web development, website project tutorial, HTML CSS JavaScript guide, backend API implementation, database integration tutorial, web deployment Vercel
---

## Architecture used:


## Designing the web interactions.






## Initialization of the systems:

- Creating a app:
```sh
pnpm create next-app@latest my-app
```

follow this:
[Drizzle ORM sqlite](https://orm.drizzle.team/docs/get-started/mysql-new)

Commands to get started:

```sh
pnpm add drizzle-orm mysql2 dotenv
pnpm add -D drizzle-kit tsx
```

```tsx
import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";

const db = drizzle(process.env.DATABASE_URL);

```

```ts
import { int, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users_table', {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  age: int().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

```

```ts
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

```

```sh

npx drizzle-kit push

```
## DBMS





