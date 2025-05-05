import { Button } from "./button";
interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="flex justify-between border-b px-4 ">
        <div className="text-lg flex flex-col justify-center">
            <div className="flex  items-center">
                <div className="text-[#6a51a6] font-extrabold text-4xl">vault</div>
                <div className="text-black font-bold text-4xl">PAY</div>
            </div>
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}