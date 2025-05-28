"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/Center";
import { TextInput } from "@repo/ui/TextInput";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSend = async () => {
    setLoading(true);
    const result = await p2pTransfer(number, Number(amount));
    setLoading(false);

    if (result?.status === "success") {
      router.push("/transfer");
    } else {
      alert(result?.message || "Transfer failed");
    }
  };

  return (
    <div className="h-[90vh]">
      <Center>
        <div
          className="rounded-2xl p-1"
          style={{ boxShadow: "0 0 20px #6a51a6" }}
        >
          <Card title="Send">
            <div className="min-w-72 pt-2 space-y-4">
              <TextInput
                label="Number"
                placeholder="Enter recipient number"
                onChange={(value) => setNumber(value)}
              />
              <TextInput
                label="Amount"
                placeholder="Enter amount"
                onChange={(value) => setAmount(value)}
              />
              <div className="pt-2 flex justify-center">
                <Button onClick={handleSend}>
                  {loading ? "Sending..." : "Send"}
                </Button>
              </div>
            </div>
          </Card>

        </div>
      </Center>
    </div>
  );
}
