import PageTitle from "./page-title";
import WalletButton from "./wallet-button";

export default function Navbar() {
  return (
    <div className="mb-12 flex w-full items-center justify-between">
      <PageTitle />
      <WalletButton />
    </div>
  );
}
