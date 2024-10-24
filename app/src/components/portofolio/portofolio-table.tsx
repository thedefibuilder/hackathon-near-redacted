import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import PortofolioTableItem from "./portofolio-table-item";

export default function PortofolioTable() {
  return (
    <>
      <h1 className="text-[32px] font-bold text-white">Your Holdings</h1>
      <div className="h-4" />
      <div className="flex items-center justify-between bg-muted-foreground py-4 px-4 rounded-t-lg text-white">
        <div className="flex justify-between w-[280px]">
        <h3 className="">AI Strategy</h3>
        <p>Balance</p>
        </div>
        <div className="flex items-center w-[800px] justify-evenly">
          <p>24h</p>
          <p>PnL</p>
          <p>Protocols</p>
        </div>
        <div className="flex justify-between w-[500px]">
        <p>Chains</p>
        <p className="pr-36">Actions</p>
        </div>
      </div>
      <div className="text-white">
      <PortofolioTableItem/>
      </div>

    </>
  );
}
