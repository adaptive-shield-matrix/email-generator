# 📧 Email Generator Microservice

A lightweight, self-hostable service for rendering HTML emails with React Email.

* **Hassle-free & maintenance-free** – runs entirely on the free tier of Cloudflare Workers.
* **Simple to use** – perfect for login codes, registration flows, and other transactional emails.
* **Flexible** – develop locally with a Bun server, then deploy serverlessly with zero configuration.
* **Clean separation** – does not pollute your project with `react` or `react-email` imports or dependencies.

Whether you need a quick drop-in solution or a fully open-source foundation for your project, this microservice makes email generation easy and reliable.

Quick Links

- code - https://github.com/adaptive-shield-matrix/email-generator
- npm - https://www.npmjs.com/package/@adaptive-sm/email-generator
- react email docs - https://react.email/docs/getting-started/manual-setup

## Features

- Renders HTML and plain text email templates.
- Supports internationalization (English and German).
- Validates input using Valibot schemas.
- Includes server timing headers for performance monitoring.
- Endpoints: `/renderEmailTemplate/registerEmailV1` and `/renderEmailTemplate/loginCodeV1`.

## Prerequisites

- Node.js (for package management) or Bun.
- Cloudflare account (for Workers deployment).

## Local Development

1. Clone the repository.
2. Install dependencies:
   ```
   bun install
   ```

### With Bun Server

- Start the development server:
  ```
  bun run start
  ```
  The server runs on `http://localhost:3055` (port configurable via `src/server/serverPortBun.ts`).

- For React Email preview (optional):
  ```
  bun run dev
  ```
  This starts the preview server at `http://localhost:3055` for template development.

### With Cloudflare Workers

- Start the local Worker development server:
  ```
  bun run dev:worker
  ```
  The Worker runs on `http://localhost:8787` (default Wrangler port).

- To test endpoints, send POST requests to:
  - `http://localhost:8787/renderEmailTemplate/registerEmailV1`
  - `http://localhost:8787/renderEmailTemplate/loginCodeV1`

## API Endpoints

All endpoints accept POST requests with JSON bodies validated against specific schemas. Responses include the rendered email (HTML and plain text) or validation errors.

### `/renderEmailTemplate/registerEmailV1`
- **Schema** (from `src/templates/registerEmailSchema.tsx`):
  ```typescript
  export const registerEmailSchema = v.object({
    l: languageSchema.optional(),
    code: v.string(),
    url: v.string(),
    homepageText: v.string(),
    homepageUrl: v.string(),
    mottoText: v.string(),
  })
  ```
- **Example Request Body**:
  ```json
  {
    "l": "en",
    "code": "abc123",
    "url": "https://example.com/verify?token=abc123",
    "homepageText": "Example",
    "homepageUrl": "https://example.com",
    "mottoText": "Your motto here"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "html": "<html>...</html>",
      "text": "Plain text version..."
    }
  }
  ```

### `/renderEmailTemplate/loginCodeV1`
- **Schema** (from `src/templates/loginCodeSchema.tsx`):
  ```typescript
  export const loginCodeSchema = v.object({
    l: languageSchema.optional(),
    code: v.string(),
    url: v.string(),
    homepageText: v.string(),
    homepageUrl: v.string(),
    mottoText: v.string(),
  })
  ```
- **Example Request Body**:
  ```json
  {
    "l": "en",
    "code": "abc123",
    "url": "https://example.com/login?code=abc123",
    "homepageText": "Example",
    "homepageUrl": "https://example.com",
    "mottoText": "Your motto here"
  }
  ```
- **Response**: Same format as above.

- **Health Check**: GET `/health` returns "OK".
- **Error Responses**: 400 for validation errors, 405 for non-POST, 404 for unknown routes.

## Testing

Run tests with Bun:
```
bun run test
```
Or in watch mode:
```
bun run test:w
```

Tests cover API rendering for login codes (extend for registration as needed).

## Deployment to Cloudflare Workers

1. **Login to Cloudflare**:
   ```
   wrangler login
   ```

2. **Configure Account ID** (if needed, add to `wrangler.toml`):
   ```
   wrangler whoami
   ```
   Then update `wrangler.toml` with `account_id = "your-account-id"`.

3. **Deploy**:
   ```
   bun run deploy
   ```
   (Or `npx wrangler deploy`.)

4. **Monitor**:

   `wrangler tail email-generator-worker`

## Notes

- The Bun server remains unchanged and can run alongside Workers.
- Workers do not support `/memoryUsage` endpoint (Bun-specific).
- All code uses TypeScript with path aliases (`@/` resolves to `src/` via `tsconfig.json`).
- Dependencies like `@react-email/render` are compatible with Workers' V8 environment.
- For issues, check Cloudflare dashboard for logs or run `wrangler tail` for real-time logs.
