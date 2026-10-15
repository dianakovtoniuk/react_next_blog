# Next.js Blog

A blog built with Next.js and TypeScript. Posts are written in Markdown, pages are statically generated, and the contact form stores messages in MongoDB.

## Features

- Static generation of the home page, post list and post pages (ISR, revalidated every 10 minutes)
- Posts written in Markdown with front matter
- Syntax highlighting for code blocks
- Contact form with a MongoDB-backed API route
- Responsive layout with CSS Modules

## Tech Stack

- Next.js 13 (Pages Router)
- React 18
- TypeScript
- MongoDB
- gray-matter, react-markdown, react-syntax-highlighter

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local env file and set your MongoDB connection string:

```bash
cp .env.example .env.local
```

```
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/my-site?retryWrites=true&w=majority
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                    |
| --------------- | ------------------------------ |
| `npm run dev`   | Start the development server   |
| `npm run build` | Create a production build      |
| `npm start`     | Run the production build       |

## Project Structure

```
components/   UI components (layout, home page, posts, contact, ui)
lib/          Helpers for reading Markdown posts
pages/        Routes and the /api/contact endpoint
posts/        Markdown posts
public/       Static assets and post images
styles/       Global styles
types/        Shared TypeScript types
```

## Adding a Post

Create a `.md` file in `posts/` with front matter:

```md
---
title: 'My Post'
date: '2022-10-16'
image: my-post.png
excerpt: A short summary of the post.
isFeatured: false
---

Post content here.
```

Put the images in `public/images/posts/<file-name>/`, where `<file-name>` matches the Markdown file name without the extension.

## Environment Variables

| Variable      | Description                          |
| ------------- | ------------------------------------ |
| `MONGODB_URI` | MongoDB connection string (required for the contact form) |
