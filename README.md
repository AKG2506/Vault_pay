# VaultPay 💸

VaultPay is a next-gen fintech wallet app built for learning, prototyping, and rapid development. It simulates digital financial transactions in a secure and scalable architecture using modern web technologies. The project is structured as a **Turborepo monorepo** with modular apps and shared packages.

The platform includes a sleek **Dashboard UI** , giving users a responsive and intuitive interface to manage wallet actions and view financial data.

---

### ✨ Features

- 🔐 **User Authentication** — NextAuth.js with JWT strategy for secure login and session management.
- 💰 **Add Money** — Instantly simulate a bank transfer to your wallet using a mock gateway.
- 🔁 **Webhook Simulation** — Update transaction statuses manually using a webhook handler to mimic real-world payment flow.
- 🔄 **P2P Transfers** — Send and receive money between registered users using wallet balances.
- 🧾 **Transaction History** — View all transactions with live status indicators.
- 🧱 **Modular Architecture** — Apps and shared packages separated via Turborepo (`apps/`, `packages/`).
- 🧪 **Prisma ORM** — Shared DB layer inside `packages/db`, powered by PostgreSQL.
- 🐳 **Docker Support** — PostgreSQL runs in a local container for smooth development.
- 🚀 **Deployed with Vercel** — Environment variables managed carefully; Prisma generation handled at build time.

---

### ⚠️ What VaultPay Is Not

VaultPay is a **prototype wallet application** meant for educational and development purposes. It **does not process real bank transactions**, **does not connect to actual bank APIs**, and **does not move real money**. All payment flows and webhook interactions are **fully simulated** to mimic a production-like experience without real financial risk.

---

