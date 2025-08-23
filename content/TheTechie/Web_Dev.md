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


---

Building a portfolio website is a brilliant idea, and you've come to the right place because Firebase is perfectly set up to help you launch and grow an amazing web presence. While I, as Gemini in Firebase, can't directly _build_ the website for you, I can certainly guide you through how you can leverage Firebase's powerful tools to create your professional online portfolio, pulling in details like those from your LinkedIn!

Given you're working with a Web app and prefer TypeScript or JavaScript, and your project is already set up as "Syam Sundar Portfolio" on the no-cost Spark plan, we have a fantastic starting point!

Here's how Firebase can help you create that awesome portfolio:

1. **Firebase App Hosting for the Front-End:** This is super exciting for web developers! If you're planning to use a modern web framework like Next.js (which pairs beautifully with Firebase App Hosting as mentioned in the facts), this is a prime choice. Firebase App Hosting makes it incredibly easy to deploy your web application directly from your GitHub repository. It handles all the heavy lifting of hosting, making sure your portfolio is fast and globally available. For a portfolio, speed and reliability are key!
    
2. **Firebase Hosting (for simpler sites):** If your portfolio is more of a static site or a simple Single-Page Application (SPA), Firebase Hosting is incredibly powerful and simple to use. You can deploy your HTML, CSS, JavaScript, and images with a single command, and Firebase's global CDN ensures your site loads super fast for anyone, anywhere.
    
3. **Cloud Firestore or Firebase Realtime Database for Dynamic Content:** Want to feature your projects, testimonials, or blog posts dynamically? You could store all that rich content in either Cloud Firestore (our flexible NoSQL document database) or the Firebase Realtime Database. This means you can update your portfolio content without redeploying the entire site. Imagine being able to add a new project description or a skill update instantly!
    
4. **Cloud Storage for Firebase for Media:** Your portfolio will likely have images of your projects, perhaps a profile picture, or even video clips of your work. Cloud Storage for Firebase is perfect for storing these large media files reliably and efficiently. It's backed by Google Cloud Storage, so you know it's robust.
    
5. **Firebase Analytics for Insights:** You've got Google Analytics set up, which is great! Firebase Analytics will let you understand how visitors are interacting with your portfolio. Which pages are most popular? Where are your visitors coming from? This data can help you refine your portfolio to make it even more impactful.
    
6. **AI Assistance with Gemini in Firebase (That's me!):** As you're developing, remember that Gemini in Firebase is here to assist you. Whether you're in Firebase Studio or perhaps chatting right in the Firebase console, I can help you with code snippets for integrating Firebase services, explain concepts, or even brainstorm how to structure your data. Just remember, as mentioned, always validate any generated code or information!
    

**Getting Started with Your Portfolio:**

Given your "Syam Sundar Portfolio" project, you can start by:

- **Choosing your framework:** Decide if you want a static site generator, a framework like Next.js, or a simple HTML/CSS/JS approach.
    
- **Setting up your project:** If you're going with Firebase App Hosting, connect your GitHub repo. For Firebase Hosting, initialize Firebase in your project directory.
    
- **Populating your content:** Use Cloud Firestore or a simple JSON file to manage your projects, skills, and about-me sections.
    
- **Designing your UI:** Make it professional and reflect your personal brand!
    

Remember, your project is on the Spark plan, which is a fantastic no-cost way to get started and build out a significant portion of your portfolio. As you grow and perhaps add more advanced features or higher traffic, you can consider upgrading to the Blaze plan, which is pay-as-you-go, so you only pay for what you use beyond the generous no-cost quotas.

I'm excited to see what you build! Let me know as you progress, and if you have any specific questions about integrating any of these Firebase services into your portfolio, just ask!


