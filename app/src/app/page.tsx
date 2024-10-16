import InvestmentStrategies from "@/components/investment-strategies/investment-strategies";
import InvestmentsPlan from "@/components/investments-plan/investments-plan";

export default async function Home() {
  return (
    <div>
      <p className="italic text-muted">Today&apos;s prices by marketcap</p>
      <div className="h-5" />
      <div className="flex gap-4">
        <div className="w-1/2 rounded-[34px] bg-foreground p-4">
          <InvestmentStrategies />
        </div>
        <div className="w-1/2 rounded-[34px] bg-foreground p-4">
          <InvestmentsPlan />
        </div>
      </div>
    </div>
  );
}
