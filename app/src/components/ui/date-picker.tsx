"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
  onChange: (date: Date | undefined) => void; 
  value: Date | undefined; 
};

export function DatePicker({ onChange, value }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild className="hover:bg-muted-foreground">
        <Button
          variant={"outline"}
          className={cn(
            "h-12 w-full justify-start text-left font-normal text-muted-foreground bg-muted-foreground border-none text-white !hover:bg-muted-foreground  hover:text-white rounded-[36px]"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-white" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value} 
          onSelect={(date) => {
            onChange(date); 
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
