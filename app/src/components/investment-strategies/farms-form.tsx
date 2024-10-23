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

export default function FarmsForm() {
  const form = useForm<z.infer<typeof farmSchema>>({
    resolver: zodResolver(farmSchema),
    defaultValues: {
      categories: [FarmCategories.ARTIFICIAL_INTELLIGENCE],
      risk: 33,
      neat: "",
      time: 'Less than 6 months',
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
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-[22px] font-bold text-white">
                  Risk Level
                </FormLabel>
                <FormControl>
                  <Slider
                    value={[field.value]}
                    onValueChange={(value: number[]) =>
                      field.onChange(value[0])
                    }
                    max={100}
                    step={25}
                  />
                </FormControl>

                <div className="mt-2 flex justify-between text-white">
                  <span>Low</span>
                  <span>Low-Medium</span>
                  <span>Medium</span>
                  <span>High</span>
                  <span>Degen</span>
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
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select {...field} >
                      <SelectTrigger className="text-white bg-muted-foreground border-none h-12 rounded-full w-full">
                        <SelectValue placeholder="Less than 6 months" />
                      </SelectTrigger>
                      <SelectContent className="bg-muted-foreground text-white border-none">
                        <SelectItem value="Less than 6 months">Less than 6 months</SelectItem>
                        <SelectItem value=">6 - 12 months">6 - 12 months</SelectItem>
                        <SelectItem value="12- 24 months">12- 24 months</SelectItem>
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
        <div className="h-10" />
        <Button
          type="submit"
          className="w-full rounded-[36px] text-[16px] font-bold text-black hover:bg-primary"
        >
          Generate Investment Strategies
        </Button>
        <div className="h-3" />
      </form>
    </Form>
  );
}
