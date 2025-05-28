"use client";

import React from "react";

const VaultPayDashboard = () => {
  const primary = "#6a51a6";

  const features = [
    "Add money to your wallet instantly (simulated bank transfer).",
    "Update transaction status manually via webhook handler.",
    "Send and receive money securely between wallet users (P2P).",
    "View your transaction history with clear status updates.",
  ];

  return (
    <div className="min-h-screen bg-slate-200 relative overflow-hidden font-sans text-gray-100">
      {/* Decorative background shapes */}
      <div
        className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-gradient-to-tr from-[#6a51a6] to-purple-400 rounded-full opacity-30 blur-3xl animate-blob"
        style={{ animationDuration: "15s" }}
      />
      <div
        className="absolute bottom-[-120px] right-[-100px] w-[300px] h-[300px] bg-gradient-to-tr from-purple-500 to-[#6a51a6] rounded-full opacity-25 blur-2xl animate-blob animation-delay-2000"
      />

      <header className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 pt-12 pb-8">
        <h1
          className="text-5xl sm:text-6xl font-extrabold tracking-wide mb-4"
          style={{ color: primary, textShadow: "0 0 8px #6a51a6aa" }}
        >
          Vault Pay
        </h1>
        <p className="max-w-3xl text-lg sm:text-xl text-black leading-relaxed">
          Your secure wallet app for simulated money transfers and peer-to-peer payments —
          powered by manual webhook updates.
        </p>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 pb-16">
        <section className="mb-20">
          <h2
            className="text-4xl font-semibold mb-10"
            style={{ color: primary }}
          >
            Key Features
          </h2>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-slate-700/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-purple-700 hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300 cursor-default"
              >
                <div
                  className="w-14 h-14 mb-6 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: primary, boxShadow: `0 0 12px ${primary}` }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-3-3v6m7 1a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-gray-100 text-lg font-semibold">{feature}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-700/90 rounded-3xl p-10 max-w-4xl mx-auto shadow-xl border border-purple-600">
          <h2
            className="text-4xl font-semibold mb-6"
            style={{ color: primary }}
          >
            What Vault Pay Is Not
          </h2>
          <p className="text-gray-300 text-lg italic leading-relaxed">
            Vault Pay is a prototype wallet app and does not process real bank transactions.
            It does not connect to bank APIs or handle real money transfers. All
            payments and webhook status updates are simulated for development and testing purposes.
          </p>
        </section>
      </main>

      {/* Animation keyframes in JSX style tag for blob animation */}
      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default VaultPayDashboard;
