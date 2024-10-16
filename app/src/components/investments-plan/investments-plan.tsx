import InvestmentsPlanHeader from "./investments-plan-header";
import InvestmentsPlanSuggestion from "./investments-plan-suggestion";

export default function InvestmentsPlan() {
  return (
   <>
    <InvestmentsPlanHeader/>
    <div className="lg:h-16"/>
    <InvestmentsPlanSuggestion/>
   </>
  );
}
