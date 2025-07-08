'use client';

import { useState } from 'react';
import { format, sub } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';

const presets = [
  { label: 'Past week', value: sub(new Date(), { weeks: 1 }) },
  { label: 'Past month', value: sub(new Date(), { months: 1 }) },
  { label: 'Past 3 months', value: sub(new Date(), { months: 3 }) },
  { label: 'Past 6 months', value: sub(new Date(), { months: 6 }) },
  { label: 'Past year', value: sub(new Date(), { years: 1 }) },
  { label: 'Past 2 years', value: sub(new Date(), { years: 2 }) },
];

type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

export function DateFilter({
  onChange,
}: {
  onChange: (range: DateRange | string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });

  const handlePreset = (label: string, startDate: Date) => {
    onChange({ from: startDate, to: new Date() });
    setOpen(false);
  };

  const handleRangeSelect = (selected: DateRange) => {
    if (selected.from && selected.to) {
      setRange(selected);
      onChange(selected);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-sm font-normal">
          {range.from && range.to
            ? `${format(range.from, 'PPP')} - ${format(range.to, 'PPP')}`
            : 'Select range'}
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0 overflow-hidden min-w-[750px] max-w-none">
        <DialogTitle></DialogTitle>
        <div className="flex">
          {/* Sidebar Presets */}
          <div className="w-48 border-r p-4 bg-muted text-sm space-y-2">
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handlePreset(preset.label, preset.value)}
                className="block w-full text-left hover:underline my-4 text-gray-800"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Dual Calendars */}
          <div className="flex gap-2 p-4 ">
            <Calendar
              mode="range"
              selected={range}
              onSelect={(date) => handleRangeSelect(date as DateRange)}
              numberOfMonths={2}
              initialFocus
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
