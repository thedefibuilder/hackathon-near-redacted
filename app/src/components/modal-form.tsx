'use client'
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
import { DatePicker } from "./ui/date-picker";
import InvestmentPlanMainCard from "./investments-plan/investment-plan-main-card";

export default function ModalForm() {
  const modalForm = useForm<z.infer<typeof modalFormSchema>>({
    resolver: zodResolver(modalFormSchema),
    defaultValues: {
      neat: "",
      time: new Date(),
      investment: [
        {
          img: "/sushi-swap.png",
          currency: "TAO/USDT",
          usdValue: 4000,
          risk: "Low Risk",
        },
        {
          img: "/akash.png",
          currency: "TAO/USDT",
          usdValue: 5000,
          risk: "Medium Risk",
        },
        {
          img: "/cream.png",
          currency: "USDT",
          usdValue: 2000,
          risk: "Medium Risk",
        },
        {
          img: "/quorum.png",
          currency: "USDC",
          usdValue: 1000,
          risk: "Height Risk",
        },
      ],
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

  return (
    <Form {...modalForm}>
      <form onSubmit={modalForm.handleSubmit(onSubmit)}>
        <div className="flex w-full items-center gap-3">
          <div className="w-1/2">
            <FormField
              control={modalForm.control}
              name="neat"
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
                    <DatePicker
                      {...field}
                      onChange={(value) => field.onChange(value)}
                    />
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