This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

project structure
my-next-app/
├── public/
│   └── (static assets)
└── src/
    ├── app/
    │   ├── (auth)/                   # Auth Routes
    │   │   ├── login/
    │   │   │   └── page.tsx
    │   │   ├── signup/
    │   │   │   └── page.tsx
    │   │   └── otp/
    │   │       └── page.tsx
    │   ├── (dashboard)/              # Protected Dashboard Routes
    │   │   ├── dashboard/
    │   │   │   ├── profile/
    │   │   │   │   └── page.tsx
    │   │   │   ├── send-money/
    │   │   │   │   └── page.tsx
    │   │   │   ├── transaction/
    │   │   │   │   └── page.tsx
    │   │   │   └── page.tsx
    │   │   └── layout.tsx             # Dashboard Layout (Sidebar, Topbar)
    │   ├── (main)/                   # Public Pages Group
    │   │   ├── contact/
    │   │   │   └── page.tsx
    │   │   ├── location/
    │   │   │   └── page.tsx
    │   │   ├── money-transfer/        # Money Transfer Flow
    │   │   │   └── page.tsx
    │   │   ├── page.tsx               # Home Page
    │   │   └── layout.tsx             # Main Layout
    │   ├── favicon.ico
    │   ├── globals.css
    │   └── layout.tsx                 # Root Layout
    ├── components/                    # UI Components
    │   ├── home/                      # Home Page Specific UI Sections
    │   │   ├── heroSection/
    │   │   ├── CardIssue.tsx
    │   │   ├── DebitCard.tsx
    │   │   ├── Features.tsx
    │   │   ├── PromoCard.tsx
    │   │   ├── Services.tsx
    │   │   └── Services2.tsx
    │   ├── money-transfer/            # Multi-step Form Components
    │   │   ├── MoneyTransferForm.tsx
    │   │   ├── Step1.tsx
    │   │   ├── Step2.tsx
    │   │   ├── Step3.tsx
    │   │   ├── Step4.tsx
    │   │   └── Step5.tsx
    │   └── shared/                    # Reusable Shared Layout Components
    │       ├── Footer.tsx
    │       ├── Footer2.tsx
    │       └── Navbar.tsx
    ├── hooks/                         # Custom Hooks
    │   ├── useLanguageToggle.ts
    │   └── useTitle.ts
    ├── types/                         # TypeScript Type Definitions / Interfaces
    │   └── index.ts
    ├── tsconfig.json                  # TS Configuration
    └── next-env.d.ts