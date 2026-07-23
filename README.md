# Quinn Portfolio

A high-tech, animated portfolio built with Next.js 14, Tailwind CSS, and Framer Motion.

## Setup

```
npm install
npm run dev
```

## Environment Variables (for contact form email delivery)

Create a `.env.local` file with:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
```

Contact form submissions are sent to **admin@litsune.com**.

## Deploy

Push this repo to GitHub, then import it into Vercel as a new project. Add the environment variables above in Vercel Project Settings before deploying.
