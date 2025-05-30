"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/Center";
import { Select } from "@repo/ui/Select";
import { useState, useTransition } from "react";
import { TextInput } from "@repo/ui/TextInput";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";
import { useRouter } from "next/navigation";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [value, setValue] = useState(0)
    const [isPending, startTransition] = useTransition(); 
    const router= useRouter();
    return <Card title="Add Money">
    <div className="">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val) => {
            setValue(Number(val));
        }} />
        <div className="py-2 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
        <Button
            onClick={() => {
              startTransition(async () => {
                await createOnRampTransaction(provider, value);
                router.refresh(); // Reload the server-side page data (refetch balance + transactions)
                // Optionally redirect to the bank:
                // window.location.href = redirectUrl;
              });
            }}
            disabled={isPending}
          >
            {isPending ? "Processing..." : "Add Money"}
          </Button>
        </div>
    </div>
</Card>
}