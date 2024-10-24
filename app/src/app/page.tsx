import InvestmentStrategies from "@/components/investment-strategies/investment-strategies";
import InvestmentsPlan from "@/components/investments-plan/investments-plan";

export default async function Home() {
  return (
    <div>
      <p className="italic text-muted">Today&apos;s prices by marketcap</p>
      <div className="h-5" />
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="max-h-[620px] w-full rounded-[34px] bg-foreground p-4 md:w-1/2">
          <InvestmentStrategies />
        </div>
        <div className="w-full md:w-1/2">
          <InvestmentsPlan />
        </div>
      </div>
    </div>
  );
}
