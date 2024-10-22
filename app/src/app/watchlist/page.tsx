import InvestmentPlan from "@/components/investments-plan/investments-plan";

export default function WatchlistPage() {
    return (
        <>
            <h1 className="text-white text-[32px] font-bold">Low risk strategies</h1>
            <div className="h-4"/>
            <InvestmentPlan isGrid haveStrategyPrompt/>
        </>
    )
}