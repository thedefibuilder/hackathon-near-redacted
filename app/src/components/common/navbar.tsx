import { Button } from "../ui/button";
import PageTitle from "./page-title";

export default function Navbar() {
    return (
        <div className="w-full flex items-center justify-between mb-12">
            <PageTitle/>
            <Button>Connect Wallet</Button>
        </div>
    )
}