"use client";
import { modalFormSchema } from "@/lib/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import InvestmentPlanMainCard from "./investments-plan/investment-plan-main-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Investment, InvestmentRiskLevel } from "@/lib/schemas/investment-types";

export default function ModalForm() {
  const modalForm = useForm<z.infer<typeof modalFormSchema>>({
    resolver: zodResolver(modalFormSchema),
    defaultValues: {
      near: "",
      time: 'Less than 6 months',
      investment: [
        {
          protocol: "SushiSwap",
          chain: "Ethereum",
          pool: "TAO/USDT",
          usdValue: 4000,
          apr: 5.0,
          risk: InvestmentRiskLevel.LOW,
          img: "/sushi-swap.png",
        },
        {
          protocol: "Akash",
          chain: "Ethereum",
          pool: "TAO/USDT",
          usdValue: 5000,
          apr: 6.5,
          risk: InvestmentRiskLevel.MEDIUM, 
          img: "/akash.png",
        },
        {
          protocol: "Cream",
          chain: "Ethereum",
          pool: "USDT",
          usdValue: 2000,
          apr: 4.0,
          risk: InvestmentRiskLevel.MEDIUM, 
          img: "/cream.png",
        },
        {
          protocol: "Quorum",
          chain: "Ethereum",
          pool: "USDC",
          usdValue: 1000,
          apr: null,
          risk: InvestmentRiskLevel.HIGH, 
          img: "/quorum.png",
        },
      ] 
    },
  });

  const onSubmit = (data: z.infer<typeof modalFormSchema>) => {
    console.log(data);
  };

  const removeInvestmentItem = (index: number) => {
    const currentInvestments = modalForm.getValues("investment");
    const updatedInvestments = currentInvestments.filter((_, i) => i !== index);
    modalForm.setValue("investment", updatedInvestments);
  };

  console.log(modalForm.watch())
  return (
    <Form {...modalForm}>
      <form onSubmit={modalForm.handleSubmit(onSubmit)}>
        <div className="flex w-full items-center gap-3">
          <div className="w-1/2">
            <FormField
              control={modalForm.control}
              name="near"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="flex w-full">
                    <div className="relative flex items-center justify-between rounded-[36px] bg-muted-foreground">
                      <Label className="px-3 text-[14px] font-light text-white">
                        Amount
                      </Label>
                      <Input
                        {...field}
                        placeholder="0"
                        className="!focus:ring-0 !focus:ring-offset-none ring-offset-none h-12 flex-1 border-0 bg-transparent px-0 text-right text-white"
                      />
                      <span className="px-3 text-[14px] font-light text-white">
                        NEAR
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <FormField
              control={modalForm.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger className="text-white bg-muted-foreground border-none h-12 rounded-full w-full">
                        <SelectValue placeholder="Less than 6 months" />
                      </SelectTrigger>
                      <SelectContent className="bg-muted-foreground text-white border-none">
                        <SelectItem value="Less than 6 months">Less than 6 months</SelectItem>
                        <SelectItem value="6 - 12 months">6 - 12 months</SelectItem>
                        <SelectItem value="12 - 24 months">12 - 24 months</SelectItem>
                        <SelectItem value="More than 24 months">More than 24 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="h-6" />
        <FormField
          control={modalForm.control}
          name="investment"
          render={({ field }) => (
            
            <FormItem>
              <FormControl>
                <InvestmentPlanMainCard
                  investment={field.value || []} 
                  onRemove={removeInvestmentItem}
                  isEditing
                />
                
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="h-10" />
        <div className="flex items-center gap-4">
          <Button
            type="submit"
            className="w-32 rounded-[36px] text-[16px] font-medium text-black hover:bg-primary"
          >
            Invest Now
          </Button>
          <Button
            type="button"
            className="w-32 rounded-[36px] bg-[#1A1D1E] text-[16px] font-medium text-white hover:bg-transparent"
          >
            Save Copy
          </Button>
        </div>
        <div className="h-3" />
      </form>
    </Form>
  );
}
