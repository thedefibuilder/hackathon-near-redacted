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
      <Table className="text-white">
        <TableHeader className="text-white bg-muted-foreground">
          <TableRow className="text-white">
            <TableHead className="text-white">AI Strategy</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-white">
          <TableRow className="text-white">
           <PortofolioTableItem/>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
