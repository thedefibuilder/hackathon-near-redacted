import {
  IconBookmark,
  IconEdit,
  IconShare,
  IconSparkles,
  IconTriangleFilled,
} from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import ModalForm from "../modal-form";
import { type InvestmentPlanHeaderCardProps } from "@/lib/schemas/investment-types";
import {
  formatCurrency,
  formatPercent,
} from "@/lib/utils/investment-calculations";

export default function InvestmentPlanHeaderCard({
  aiRisk,
  generatedDate,
  title,
  estimatedPnL,
  averageAPR,
  investmentInfo,
}: InvestmentPlanHeaderCardProps) {
  const formatValue = (value: number | string | Date | undefined) => {
    if (value instanceof Date) {
      return value.toLocaleDateString();
    }
    return value;
  };

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4 text-[12px]">
          <div className="flex items-center gap-1 text-[12px] text-muted">
            <IconSparkles stroke={2} />
            <p>AI Risk Match {aiRisk}%</p>
          </div>
          <div>
            <p>Generated on: {generatedDate}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <IconShare stroke={2} />
          <div className="rounded bg-gray-700 p-1">
            <IconBookmark stroke={2} />
          </div>
        </div>
      </div>
      <div className="h-2" />

      <h1 className="text-[32px] text-white">{title}</h1>
      <div className="h-2" />
      <div className="flex w-full items-center justify-between">
        <p className="w-auto text-left text-primary">
          Estimated PnL & APR Over The Investment Period
        </p>
        <div className="flex w-auto items-center justify-end gap-3">
          <div className="rounded bg-black px-2 py-1">
            <p>+{formatCurrency(estimatedPnL)}</p>
          </div>
          <div className="flex items-center gap-1 rounded bg-black px-2 py-1 text-primary">
            <IconTriangleFilled stroke={2} className="h-2 w-2" />
            <p>{formatPercent(averageAPR)} APR</p>
          </div>
        </div>
      </div>

      <div className="h-4" />
      <div className="flex items-center gap-4">
        {investmentInfo.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            <item.icon stroke={2} />
            {item.name && <p>{item.name}</p>}
            <p>{formatValue(item.value)}</p>
          </div>
        ))}
      </div>

      <div className="h-4" />
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-primary px-6 py-2 font-semibold text-black">
          Invest Now
        </div>

        <Dialog>
          <DialogTrigger className="flex items-center gap-2 rounded bg-[#1A1D1E] px-4 py-2 text-white">
            <IconEdit stroke={2} />
            <p>Edit</p>
          </DialogTrigger>
          <DialogContent className="border-primary bg-foreground text-white lg:rounded-[16px]">
            <DialogHeader>
              <div className="flex w-full items-center gap-4 text-[12px]">
                <div className="flex items-center gap-1 text-[12px] text-muted">
                  <IconSparkles stroke={2} />
                  <p>AI Risk Match {aiRisk}%</p>
                </div>
                <div>
                  <p>Generated on: {generatedDate}</p>
                </div>
              </div>

              <h1 className="text-[32px] text-white">{title}</h1>
              <div className="h-4" />
              <div className="flex items-center gap-4">
                {investmentInfo.map((item, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <item.icon stroke={2} />
                    {item.name && <p>{item.name}</p>}
                    <p>{formatValue(item.value)}</p>
                  </div>
                ))}
              </div>

              <div className="h-4" />
              <div className="flex w-full items-center justify-between">
                <p className="w-4/6 text-left text-primary">
                  Estimated PnL Since Added to the Watchlist
                </p>
                <div className="flex w-1/3 items-center justify-end gap-3">
                  <div className="rounded bg-black px-2 py-1">
                    <p>+{formatCurrency(estimatedPnL)}</p>
                  </div>
                  <div className="flex items-center gap-1 rounded bg-black px-2 py-1 text-primary">
                    <IconTriangleFilled stroke={2} className="h-2 w-2" />
                    <p>{formatPercent(averageAPR)} APR</p>
                  </div>
                </div>
              </div>
              <div className="h-4" />
              <ModalForm />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
