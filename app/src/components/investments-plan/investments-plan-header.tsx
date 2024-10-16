import {
  IconDotsVertical,
  IconMapPin,
  IconPencil,
  IconPlus,
} from "@tabler/icons-react";
import Image from "next/image";
import { PieChartCustom } from "@/components/investments-plan/pie-chart";
import { Button } from "../ui/button";

export default function InvestmentsPlanHeader() {
  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <div className="h-4" />
          <Image src="/rating.png" alt="rating" width={122} height={18} />
          <div className="flex items-center gap-3">
            <h2 className="text-[32px] text-white">Balanced AI</h2>
            <Image src="/chians.png" alt="chians" width={56} height={24} />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <IconPlus
            stroke={2}
            className="rounded-full border border-muted p-1 text-white"
          />
          <IconDotsVertical
            stroke={2}
            className="rounded-full border border-muted p-1 text-white"
          />
        </div>
      </div>

      <div className="flex w-full items-center justify-between gap-4 text-white">
        <div className="-mt-20 flex w-1/2 items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <IconMapPin stroke={2} />
              <p>$12,000</p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <IconMapPin stroke={2} />
              <p>4 Protocols</p>
            </div>
          </div>

          <div className="w-1/2">
            <div className="flex items-center gap-2">
              <IconMapPin stroke={2} />
              <p>Low Risk</p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <IconMapPin stroke={2} />
              <p>3 Chains</p>
            </div>
          </div>
        </div>

        <div className="w-1/2">
          <PieChartCustom />
        </div>
      </div>

      <div className="-mt-24 flex items-center gap-3">
        <Button className="w-44 rounded-full text-black hover:bg-primary">
          <IconPlus stroke={2} /> Invest Now
        </Button>
        <Button variant="ghost" className="text-white hover:bg-transparent hover:text-white">
          <IconPencil stroke={2} />
          Edit
        </Button>
      </div>
    </>
  );
}
