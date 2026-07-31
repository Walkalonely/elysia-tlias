# Elysia with Bun runtime

## Getting Started

To get started with this template, simply paste this command into your terminal:

```bash
bun create elysia ./elysia-example
```

## Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

```bash
bun add @prisma/client @prisma/adapter-pg pg
bun add -d prisma
bunx --bun prisma init --datasource-provider postgresql --output ../generated/prisma
bunx prisma migrate dev
bunx prisma generate
```
