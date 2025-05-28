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
- 🛡 **Database Locking**: Protects against race conditions using locking during concurrent transfers.
- 🐳 **Docker Support** — PostgreSQL runs in a local container for smooth development.
- 🚀 **Deployed with Vercel** — Environment variables managed carefully; Prisma generation handled at build time.

---

### ⚠️ What VaultPay Is Not

VaultPay is a **prototype wallet application** meant for educational and development purposes. It **does not process real bank transactions**, **does not connect to actual bank APIs**, and **does not move real money**. All payment flows and webhook interactions are **fully simulated** to mimic a production-like experience without real financial risk.

---

### 🧪 Live App Testing Guide (Deployed on Vercel)

> 🟠 **Note**: Webhook simulation requires server-side DB access. Vercel-deployed users cannot trigger webhook status updates manually. So wallet balances from Add Money remain **pending** unless the webhook is called (not exposed in public UI).

#### ✅ You Can:
- Create multiple accounts (e.g., two users with different phone numbers).
- Simulate **Add Money** (funds show up only after webhook triggers).
- Perform **P2P transfers** using wallets with confirmed balances.

#### 🚫 You Can't:
- Manually trigger the webhook to confirm Add Money status.
- See funds reflected immediately after Add Money (requires backend webhook).

---
### 🧪 Recommended Test Flow

1. 🔐 **Create two accounts** using two different mobile numbers.
2. 💵 For one user, simulate **Add Money** (status stays "Processing").
3. 🧑‍🤝‍🧑 Switch between accounts and test **P2P transfer** to see money move between wallets (only if source user has confirmed balance).
4. 🛡 If you attempt concurrent requests (e.g., click transfer multiple times), the backend safely locks rows using **database-level locking** to prevent double spending.

---
### ⚠️ Disclaimer

VaultPay is a **development prototype**.  
- ❌ No real money is moved.
- ❌ No actual bank APIs are used.
- ✅ All transactions are **mocked/simulated** for educational purposes only.

---

