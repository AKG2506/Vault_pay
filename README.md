
# 🚀 VaultPay 💸

VaultPay is a next-gen fintech wallet app built for learning, prototyping, and rapid development.  
It simulates digital financial transactions in a secure and scalable architecture using modern web technologies.

🔧 **Built with:**  
**Turborepo**, **Next.js**, **Prisma**, **PostgreSQL**, **Docker**, and more!

🖥️ The platform features a sleek, responsive **Dashboard UI** for managing wallets and tracking financial activities.

---

## 📚 Table of Contents

- [✨ Features](#-features)
- [⚠️ What VaultPay Is Not](#️-what-vaultpay-is-not)
- [🧪 Live App Testing Guide (Deployed on Vercel)](#-live-app-testing-guide-deployed-on-vercel)
- [🚀 Getting Started](#-getting-started)
- [💻 Running Locally](#-running-locally)
- [🤝 Contributing](#-contributing)

---

## ✨ Features

- 🔐 **User Authentication** — Secure login/session via NextAuth.js (JWT).
- 💰 **Add Money** — Simulate bank transfers to wallet with a mock gateway.
- 🔁 **Webhook Simulation** — Manually update transaction status via a mock webhook.
- 🔄 **P2P Transfers** — Transfer money between users using wallet balances.
- 🧾 **Transaction History** — Real-time updates with status indicators.
- 🧱 **Modular Architecture** — Structured via Turborepo (`apps/`, `packages/`).
- 🧪 **Prisma ORM** — Centralized DB layer inside `packages/db`.
- 🛡 **Database Locking** — Prevents race conditions on concurrent transfers.
- 🐳 **Docker Support** — PostgreSQL containerized for easier development.
- 🚀 **Vercel Deployment** — Deployed with build-time Prisma generation.

---

## ⚠️ What VaultPay Is Not

> ❗ This is a **development prototype** intended solely for **educational use**.

- ❌ Does NOT connect to real bank APIs.
- ❌ Does NOT process real transactions or move money.
- ✅ All data flow and transaction simulations are fully mocked.

---

## 🧪 Live App Testing Guide (Deployed on Vercel)

> ⚠️ Webhook triggers require backend access — not available on Vercel UI.

### ✅ You Can:

- 🔐 Create accounts (e.g., with two mobile numbers).
- 💳 Simulate **Add Money** (shows "Processing").
- 🔁 Perform **P2P Transfers** (only if funds are confirmed).

### 🚫 You Can't:

- 🔄 Manually trigger the webhook (requires local access).
- 💸 See funds instantly post-"Add Money" (needs webhook confirmation).

### 🧪 Recommended Test Flow:

1. Create two accounts.
2. Simulate "Add Money" — remains **Processing**.
3. Switch accounts and try **P2P Transfers**.
4. Backend uses DB locking to handle concurrent actions safely.

---

## 🚀 Getting Started

Clone, install, and run locally with the following steps.

### 🔧 Prerequisites

Ensure the following tools are installed:

- Node.js (v18+)
- npm
- Git
- PostgreSQL (or Neon.tech/Docker)
- Docker (optional, for local Postgres)
- Postman (or API client)

### 📦 Installation

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
```

---

## 💻 Running Locally

### 🔐 Configure Environment Variables

```bash
cp .env.example .env
cp apps/user-app/.env.example apps/user-app/.env
cp packages/db/.env.example packages/db/.env
cp apps/bank-webhook/.env.example apps/bank-webhook/.env
```

Fill in `.env` files appropriately.

**Example (`apps/user-app/.env`):**

```env
JWT_SECRET=test
NEXTAUTH_URL=http://localhost:3001
```

**Example (`packages/db/.env`):**

```env
DATABASE_URL="postgresql://user:password@host:port/database"
```

### ▶️ Start the User Application

```bash
npm run start-user-app
# Runs on http://localhost:3001
```

### 💸 Perform "Add Money"

- Login to the User App
- Navigate to **Transfer** section
- Initiate an **Add Money** transaction

### 🌐 Start the Webhook Server

```bash
cd apps/bank-webhook/
tsc -b
node dist/index.js
# Typically runs on http://localhost:3003
```

### 📬 Simulate Webhook via Postman

- URL: `http://localhost:3003/hdfcWebhook`
- Method: `POST`
- Header: `Content-Type: application/json`
- Body:

```json
{
  "token": "EXTRACT_FROM_DB",
  "user_identifier": "EXTRACT_FROM_DB",
  "amount": "EXTRACT_FROM_DB",
  "status": "Success"
}
```

> 🧠 Replace placeholders using your database records.

### 📊 Verify Transaction

- Refresh the dashboard
- You should now see the transaction status updated!

---

## 🤝 Contributing

We ❤️ contributions!

1. Fork the repo
2. Create a branch (`git checkout -b feat/new-feature`)
3. Commit and push your changes
4. Open a Pull Request

---

🧠 **Learning by building. Simulating the real world. VaultPay it forward.**
