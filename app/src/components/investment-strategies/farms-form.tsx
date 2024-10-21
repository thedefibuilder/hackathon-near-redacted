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
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { DatePicker } from "../ui/date-picker";

export default function FarmsForm() {
  const form = useForm<z.infer<typeof farmSchema>>({
    resolver: zodResolver(farmSchema),
    defaultValues: {
      categories: [FarmCategories.ARTIFICIAL_INTELLIGENCE],
      risk: 33, 
      neat: "",
      time: new Date(),
    },
  });

  const onSubmit = (data: z.infer<typeof farmSchema>) => {
    const formattedData = {
      ...data,
      neat: Number(data.neat),
    };
    console.log("Form submitted with data:", formattedData);
  };

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
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[22px] font-bold text-white">
                Risk Level
              </FormLabel>
              <FormControl>
                <Slider
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])} 
                  max={100}
                  step={3}
                />
              </FormControl>
              <FormDescription className="flex items-center justify-between text-white">
                <span>Very Low</span>
                <span>Very High</span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
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
            name="neat"
            render={({ field }) => (
              <FormItem>
                <FormControl className="flex w-full">
                  <div className="relative flex justify-between items-center rounded-[36px] bg-muted-foreground">
                    <Label className="px-3 text-[14px] font-light text-white">
                      Amount
                    </Label>
                    <Input
                      {...field}
                      placeholder="0"
                      className="h-12 !focus:ring-0 !focus:ring-offset-none ring-offset-none flex-1 border-0 bg-transparent px-0 text-right text-white"
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
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem >
                <FormControl>
                  <DatePicker
                    {...field} 
                    onChange={(value) => field.onChange(value)} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /></div>
     
      
        </div>
        <div className="h-10" />
        <Button
          type="submit"
          className="hover:bg-transparent w-full rounded-[36px] text-[16px] font-bold text-black"
        >
          Generate Investment Strategies
        </Button>
        <div className="h-3" />
      </form>
    </Form>
  );
}
