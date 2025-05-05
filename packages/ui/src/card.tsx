import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="p-4 flex flex-col"
    >
      <h1 className="text-xl border-b font-medium ">
        {title}
      </h1>
      {children}
    </div>
  );
}
