export default function InvestmentSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-4 rounded-[34px] bg-foreground p-4">
        {/* Header Skeleton */}
        <div className="flex justify-between">
          <div className="h-4 w-1/3 rounded bg-gray-700" />
          <div className="h-4 w-1/4 rounded bg-gray-700" />
        </div>
        <div className="mt-4 h-8 w-2/3 rounded bg-gray-700" />

        {/* Info Skeleton */}
        <div className="mt-4 flex gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 w-20 rounded bg-gray-700" />
          ))}
        </div>

        {/* Investment Cards Skeleton */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded bg-gray-700" />
          ))}
        </div>
      </div>
    </div>
  );
}
