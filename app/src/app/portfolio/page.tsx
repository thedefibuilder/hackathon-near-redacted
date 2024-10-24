import PortofolioOverview from "@/components/portofolio/portofolio-overview";
import PortofolioTable from "@/components/portofolio/portofolio-table";

export default function PortofolioPage() {
  return (
    <>
      <PortofolioOverview />
      <div className="h-14"/>
      <PortofolioTable/>
    </>
  );
}
