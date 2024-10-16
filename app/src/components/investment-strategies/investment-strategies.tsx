import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import FarmsForm from "./farms-form";

export default function InvestmentStrategies() {
  return (
    <Tabs defaultValue="farms">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/fire.png"
            alt="flame-icon"
            width={28}
            height={28}
            className="h-[28px] w-[28px]"
          />
          <h2 className="text-[22px] text-white">Generate Strategy</h2>
        </div>
        <TabsList className="!h-12 rounded-full bg-muted-foreground text-white">
          <TabsTrigger
            value="farms"
            className="h-10 px-4 data-[state=active]:rounded-full data-[state=active]:bg-white"
          >
            Farms
          </TabsTrigger>
          <TabsTrigger
            value="tokens"
            disabled
            className="h-10 px-4 data-[state=active]:rounded-full data-[state=active]:bg-white"
          >
            Tokens
          </TabsTrigger>
        </TabsList>
      </div>
      <div className="h-8" />
      <TabsContent value="farms">
        <FarmsForm/>
      </TabsContent>
      <TabsContent value="tokens">Change your password here.</TabsContent>
    </Tabs>
  );
}
