import {
  IconEdit,
  IconEye,
  IconPlus,
  IconTriangleFilled,
  IconTriangleInvertedFilled,
} from "@tabler/icons-react";
import { Button } from "../ui/button";
import Link from "next/link";

type TPortofolioProps = {
  currentBalance: string;
  lostValue: string;
  allTimeProfit: {
    percent: string;
    value: string;
  };
  bestPerformer: {
    percent: string;
    value: string;
  };
  worstPerformer: {
    percent: string;
    value: string;
  };
};

const portofolioOverviewItem: TPortofolioProps = {
  currentBalance: '2,77,308.00',
  lostValue: '1200.78 (-1.89%)',
  allTimeProfit: {
    percent: '2.52',
    value: '324.82',
  },
  bestPerformer: {
    percent: '10.52',
    value: '627.82',
  },
  worstPerformer: {
    percent: '1.23',
    value: '87.32',
  },
};

export default function PortofolioOverview() {
  const {currentBalance, lostValue ,allTimeProfit, bestPerformer, worstPerformer} = portofolioOverviewItem; 

  return (
    <>
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-3">
            <p className="text-[12px] text-[#E1E1E1]">Current balance</p>
            <IconEye stroke={2} />
          </div>
          <div className="h-2" />
          <h1 className="text-3xl font-bold text-white">${currentBalance}</h1>
          <div className="h-2" />
          <div className="flex items-center gap-3">
            <p className="text-[#F92C2C]">-${lostValue}</p>
            <p className="rounded-full bg-muted-foreground px-4 py-2 text-white">
              24H
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            className="flex h-12 items-center gap-3 rounded-full bg-[#1A1D1E] px-4 py-2 text-white"
            disabled
          >
            <IconEdit stroke={2} />
            <p>Edit</p>
          </Button>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-full bg-primary px-6 py-2 text-black hover:bg-primary"
          >
            <IconPlus stroke={2} />
            <p>Add transaction</p>
          </Link>
        </div>
      </div>
      <div className="h-8" />
      <div className="flex w-1/2 justify-between">
        <div>
          <p className="text-[12px] italic text-[#E1E1E1]">All time profit</p>
          <div className="h-2" />
          <div className="flex items-center gap-2 text-primary">
            <IconTriangleFilled />
            <p>{allTimeProfit.percent}% (+${allTimeProfit.value})</p>
          </div>
        </div>

        <div>
          <p className="text-[12px] italic text-[#E1E1E1]">Best performer</p>
          <div className="h-2" />
          <div className="flex items-center gap-2 text-primary">
            <IconTriangleFilled />
            <p>{bestPerformer.percent}% (+${bestPerformer.value})</p>
          </div>
        </div>

        <div>
          <p className="text-[12px] italic text-[#E1E1E1]">Worst performer</p>
          <div className="h-2" />
          <div className="flex items-center gap-2 text-[#F92C2C]">
            <IconTriangleInvertedFilled />
            <p>{worstPerformer.percent}% (-${worstPerformer.value})</p>
          </div>
        </div>
      </div>
    </>
  );
}
