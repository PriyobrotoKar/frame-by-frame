import * as React from 'react';

import { Calendar } from '@/components/ui/calendar';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const isPastSlot = (time: string, selectedDate: Date) => {
  const [timeStr, ampm] = time.split(' ');
  if (!timeStr || !ampm) return false;

  const [hours, minutes] = timeStr.split(':');
  if (!hours || !minutes) return false;

  const formattedHours = (Number(hours) % 12) + (ampm === 'PM' ? 12 : 0);

  const timeObj = new Date();
  timeObj.setHours(formattedHours, Number(minutes), 0, 0);

  const todayDate = new Date();
  const currentHour = todayDate.getHours();
  todayDate.setHours(0, 0, 0, 0);

  if (selectedDate.getTime() !== todayDate.getTime()) return false;

  return timeObj.getHours() <= currentHour;
};

const generateTimeSlots = (
  startHour: number,
  endHour: number,
  timespan = 60,
) => {
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  if (startHour >= endHour) return [];

  const totalMinutes = (endHour - startHour) * 60;
  const slots = Math.floor(totalMinutes / timespan);

  const timings = Array.from({ length: slots }, (_, i) => {
    const minutes = i * timespan;
    const hours = Math.floor(minutes / 60) + startHour;

    const istTime = new Date();
    istTime.setUTCHours(hours - 5, (minutes % 60) - 30, 0, 0); // IST is UTC+5:30

    // Convert to local time
    return new Date(istTime.getTime());
  }).sort();

  return timings.map((time) =>
    time.toLocaleTimeString('en', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  );
};

interface AppointmentCalendarProps {
  date: Date;
  onDateChange: (date: Date) => void;
  time: string | null;
  onTimeChange: (time: string | null) => void;
  bookedDates: Date[];
}

export default function AppointmentCalendar({
  date,
  onDateChange,
  time: selectedTime,
  onTimeChange,
  bookedDates,
}: AppointmentCalendarProps) {
  const timeSlots = generateTimeSlots(12, 24);

  const structuredBookings: Record<string, string[]> = {};
  const fullBookedDates: Date[] = [];
  bookedDates.forEach((date) => {
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const formatedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    structuredBookings[formattedDate] = structuredBookings[formattedDate] || [];
    structuredBookings[formattedDate].push(formatedTime);
  });

  Object.entries(structuredBookings).forEach(([key, value]) => {
    if (value.length === timeSlots.length) {
      fullBookedDates.push(new Date(key));
    }
  });

  const isTimeSlotBooked = (time: string) => {
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return structuredBookings[formattedDate]?.includes(time) || false;
  };

  useEffect(() => {
    if (!date) return;

    if (!selectedTime) return;

    if (isTimeSlotBooked(selectedTime)) {
      onTimeChange(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, selectedTime]);

  return (
    <div className="flex max-h-[24rem] flex-col gap-8 overflow-y-auto md:max-h-none md:flex-row md:gap-0">
      <div className="bg-input rounded-xl p-4 md:p-6">
        <Calendar
          required
          mode="single"
          selected={date}
          onSelect={onDateChange}
          defaultMonth={date}
          startMonth={new Date()}
          endMonth={
            new Date(new Date().getFullYear(), new Date().getMonth() + 1)
          }
          disabled={[
            {
              before: new Date(),
            },
            ...fullBookedDates,
          ]}
          showOutsideDays={false}
          className="bg-transparent p-0 [--cell-size:2rem] md:[--cell-size:2.5rem]"
          formatters={{
            formatWeekdayName: (date) => {
              return date.toLocaleString('en-US', { weekday: 'short' });
            },
          }}
        />
      </div>
      <div className="min-w-60 space-y-5">
        <div className="space-y-2 text-center">
          <h3 className="text-primary-foreground text-xl">Select slot</h3>
          <p className="text-sm">Online meeting of 1 hr</p>
        </div>
        <div className="no-scrollbar inset-y-0 right-0 flex max-h-72 w-full flex-col gap-4 overflow-y-auto px-6 md:max-h-[22rem] md:w-full">
          <div className="grid gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                size={'sm'}
                disabled={isTimeSlotBooked(time) || isPastSlot(time, date)}
                variant={'ghost'}
                onClick={() => onTimeChange(time)}
                className={cn(
                  'bg-input text-muted-foreground flex h-10 w-full cursor-pointer items-center justify-center rounded-lg border text-sm shadow-none',
                  selectedTime === time &&
                    'bg-accent border-ring text-secondary',
                  isTimeSlotBooked(time) && 'text-muted-foreground',
                )}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
