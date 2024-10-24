"use client";
import { FarmCategories, farmSchema } from "@/lib/schemas/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { api } from "@/trpc/react";
import { useStrategyStore } from "@/lib/stores/strategy-store";
import { InvestmentRiskLevel } from "@/lib/schemas/investment-types"; // Ensure this is correctly imported
import { useToast } from "../ui/toast-provider";

export default function FarmsForm() {
  const { toast } = useToast();
  const { addStrategy, setLoading } = useStrategyStore();

  const generateStrategy = api.strategy.generate.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      toast({
        title: "Strategy Generated",
        description:
          "Your investment strategy has been generated successfully.",
        type: "foreground",
      });

      if (data.strategy) {
        addStrategy(data.strategy);
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        type: "foreground",
        duration: 6000,
      });
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const form = useForm<z.infer<typeof farmSchema>>({
    resolver: zodResolver(farmSchema),
    defaultValues: {
      categories: [FarmCategories.ARTIFICIAL_INTELLIGENCE],
      risk: InvestmentRiskLevel.LOW,
      near: "",
      time: "Less than 6 months",
    },
  });

  const mapRiskValue = (value: number): InvestmentRiskLevel => {
    if (value < 50) return InvestmentRiskLevel.LOW;
    if (value < 75) return InvestmentRiskLevel.MEDIUM;
    return InvestmentRiskLevel.HIGH;
  };

  const onSubmit = async (data: z.infer<typeof farmSchema>) => {
    const riskLevel = data.risk;
    const userId = "0x123456789ccb";

    await generateStrategy.mutateAsync({
      ...data,
      userId,
    });
  };

  console.log(form.watch());

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[22px] font-bold text-white">
                Categories
              </FormLabel>
              <FormControl>
                <ToggleGroup
                  type="multiple"
                  value={field.value}
                  onValueChange={field.onChange}
                  className="hover:transparent flex flex-wrap justify-start gap-3 text-white"
                >
                  {Object.values(FarmCategories).map((category) => (
                    <ToggleGroupItem
                      key={category}
                      value={category}
                      className="rounded-[36px] border border-white hover:bg-transparent hover:text-white"
                    >
                      {category}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="h-10" />
        <FormField
          control={form.control}
          name="risk"
          render={({ field }) => {
            const sliderValue: number =
              field.value === InvestmentRiskLevel.LOW
                ? 0
                : field.value === InvestmentRiskLevel.MEDIUM
                  ? 50
                  : field.value === InvestmentRiskLevel.HIGH
                    ? 75
                    : field.value === InvestmentRiskLevel.Degen
                      ? 100
                      : 0; 

            const mapRiskValue = (value: number): InvestmentRiskLevel => {
              switch (value) {
                case 0:
                  return InvestmentRiskLevel.LOW;
                case 50:
                  return InvestmentRiskLevel.MEDIUM;
                case 75:
                  return InvestmentRiskLevel.HIGH;
                case 100:
                  return InvestmentRiskLevel.Degen;
                default:
                  return InvestmentRiskLevel.LOW; 
              }
            };

            return (
              <FormItem>
                <FormLabel className="text-[22px] font-bold text-white">
                  Risk Level
                </FormLabel>
                <FormControl>
                  <Slider
                    value={[sliderValue]}
                    onValueChange={(value: number[]) => {
                      if (Array.isArray(value) && value.length > 0) {
                        const risk = mapRiskValue(value[0]!); // Non-null assertion
                        field.onChange(risk);
                      }
                    }}
                    max={100}
                    step={25}
                    min={0}
                  />
                </FormControl>
                <div className="relative mt-2 flex justify-between text-white">
                  <span style={{ position: "absolute", left: "0%" }}>Low</span>
                  <span style={{ position: "absolute", left: "45%" }}>
                    Medium
                  </span>
                  <span style={{ position: "absolute", left: "72%" }}>
                    High
                  </span>
                  <span style={{ position: "absolute", left: "93%" }}>
                    Degen
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="h-10" />
        <Label className="text-[22px] font-bold text-white">
          Capital Committed
        </Label>
        <div className="h-3" />
        <div className="flex w-full items-center gap-3">
          <div className="w-1/2">
            <FormField
              control={form.control}
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
                      <span className="px-3 text-[14px] font-extrabold text-white">
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
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger className="h-12 w-full rounded-full border-none bg-muted-foreground text-white">
                        <SelectValue placeholder="Less than 6 months" />
                      </SelectTrigger>
                      <SelectContent className="border-none bg-muted-foreground text-white">
                        <SelectItem value="Less than 6 months">
                          Less than 6 months
                        </SelectItem>
                        <SelectItem value=">6 - 12 months">
                          6 - 12 months
                        </SelectItem>
                        <SelectItem value="12- 24 months">
                          12- 24 months
                        </SelectItem>
                        <SelectItem value="More than 24 months">
                          More than 24 months
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="h-10" />
        <Button
          type="submit"
          className="w-full rounded-[36px] text-[16px] font-bold text-black hover:bg-primary-foreground"
          disabled={generateStrategy.isPending}
        >
          {generateStrategy.isPending
            ? "Generating..."
            : "Generate Investment Strategies"}
        </Button>
        <div className="h-3" />
      </form>
    </Form>
  );
}
