import { SidebarItem } from "../../components/SidebarItem";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-200 border-r border-gray-200 flex flex-col py-6 px-4">
        <div className="space-y-4">
          <SidebarItem href="/dashboard" icon={<HomeIcon />} title="Home" />
          <SidebarItem href="/transfer" icon={<TransferIcon />} title="Transfer" />
          <SidebarItem href="/transactions" icon={<TransactionsIcon />} title="Transactions" />
          <SidebarItem href="/p2p" icon={<P2PTransferIcon />} title="P2P Transfer" />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

// Icons
function HomeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6 text-gray-600"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955a1.125 1.125 0 011.591 0L21.75 12M4.5 9.75v10.125A1.125 1.125 0 005.625 21h4.125v-4.875a1.125 1.125 0 011.125-1.125h2.25a1.125 1.125 0 011.125 1.125V21h4.125A1.125 1.125 0 0020.25 19.875V9.75M8.25 21h8.25"
      />
    </svg>
  );
}

function TransferIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6 text-gray-600"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
      />
    </svg>
  );
}

function TransactionsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6 text-gray-600"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0Z"
      />
    </svg>
  );
}

function P2PTransferIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-8  text-gray-600"
    >
      {/* Left person (head + shoulders) */}
      <circle cx="6" cy="7" r="2" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 12c0-1 4-1 4 0v2H4v-2z"
      />

      {/* Arrow */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 10h6m0 0l-3-3m3 3l-3 3"
      />

      {/* Right person (head + shoulders) */}
      <circle cx="18" cy="7" r="2" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 12c0-1 4-1 4 0v2h-4v-2z"
      />
    </svg>
  );
}


