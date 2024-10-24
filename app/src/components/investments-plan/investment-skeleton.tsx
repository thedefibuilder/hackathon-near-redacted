import {
  IconBox,
  IconCalendarTime,
  IconPig,
  IconWallet,
} from "@tabler/icons-react";

export default function InvestmentSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-4 rounded-[34px] bg-foreground p-4">
        {/* Header Section */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 rounded bg-gray-700" />{" "}
              {/* Icon placeholder */}
              <div className="h-4 w-24 rounded bg-gray-700" />{" "}
              {/* Text placeholder */}
            </div>
            <div className="h-4 w-32 rounded bg-gray-700" />{" "}
            {/* Date placeholder */}
          </div>
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded bg-gray-700" /> {/* Share icon */}
            <div className="h-6 w-6 rounded bg-gray-700" />{" "}
            {/* Bookmark icon */}
          </div>
        </div>
        {/* Title Section */}
        <div className="h-4" />
        <div className="h-8 w-2/3 rounded bg-gray-700" />{" "}
        {/* Title placeholder */}
        <div className="h-4" />
        {/* PnL & APR Section */}
        <div className="flex w-full items-center justify-between">
          <div className="h-4 w-1/2 rounded bg-gray-700" />{" "}
          {/* Text placeholder */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-24 rounded bg-gray-900" /> {/* PnL value */}
            <div className="h-8 w-24 rounded bg-gray-900" /> {/* APR value */}
          </div>
        </div>
        {/* Investment Info Section */}
        <div className="h-6" />
        <div className="flex items-center gap-4">
          {[IconBox, IconPig, IconWallet, IconCalendarTime].map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-5 w-5 rounded bg-gray-700" /> {/* Icon */}
              <div className="h-4 w-16 rounded bg-gray-700" /> {/* Text */}
            </div>
          ))}
        </div>
        {/* Action Buttons */}
        <div className="h-6" />
        <div className="flex items-center gap-3">
          <div className="h-10 w-28 rounded-full bg-gray-700" />{" "}
          {/* Invest button */}
          <div className="h-10 w-24 rounded bg-gray-900" /> {/* Edit button */}
        </div>
        {/* Investment Cards Section */}
        <div className="h-8" />
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="relative rounded-lg bg-[#0F0F0F] p-4">
              <div className="flex items-center gap-4">
                {/* Protocol Icon */}
                <div className="h-20 w-20 rounded-full bg-gray-700" />

                {/* Content */}
                <div className="flex flex-1 flex-col gap-3">
                  <div className="h-6 w-20 rounded bg-gray-700" />{" "}
                  {/* Risk label */}
                  <div className="h-4 w-3/4 rounded bg-gray-700" />{" "}
                  {/* Pool name */}
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-24 rounded bg-gray-700" />{" "}
                    {/* Amount */}
                    <div className="h-4 w-16 rounded bg-gray-700" /> {/* APR */}
                  </div>
                </div>
              </div>
              {/* Bottom border accent */}
              <div className="absolute bottom-0 left-0 h-2 w-full rounded-b-lg bg-gray-700" />
            </div>
          ))}
        </div>
        {/* Distribution Bar */}
        <div className="h-8" />
        <div className="h-6 w-36 rounded bg-gray-700" />{" "}
        {/* Distribution title */}
        <div className="h-4" />
        <div className="h-2 w-full rounded-lg bg-gray-700" />{" "}
        {/* Distribution bar */}
      </div>
    </div>
  );
}
