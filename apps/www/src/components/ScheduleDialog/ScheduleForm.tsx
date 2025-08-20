'use client';
import { useEffect, useState } from 'react';
import AppointmentCalendar from '../AppointmentCalendar';
import { Button } from '../ui/button';
import { DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { useAtom } from 'jotai';
import { scheduleMeetingAtom } from '@/lib/store';
import { createContact, getBookings } from '@/app/actions/contact';
import { createActionSecret } from '@/lib/utils';

interface ScheduleFormProps {
  goToPreviousStep: () => void;
  setIsBookedSuccess: (value: boolean) => void;
}

const ScheduleForm = ({
  goToPreviousStep,
  setIsBookedSuccess,
}: ScheduleFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date>(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
    ),
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [scheduleMeeting, setScheduleMeeting] = useAtom(scheduleMeetingAtom);

  const [structuredBookings, setStructuredBookings] = useState<Date[]>([]);

  const handleSubmit = async () => {
    if (!date || !selectedTime) return;

    const [time, ampm] = selectedTime.split(' ');
    if (!time || !ampm) return;

    const [hour, minute] = time.split(':');
    if (!hour || !minute) return;

    setIsSubmitting(true);

    const twentyFourHour = (parseInt(hour) % 12) + (ampm === 'PM' ? 12 : 0);

    const bookedAt = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
    bookedAt.setHours(twentyFourHour);
    bookedAt.setMinutes(parseInt(minute));

    const data = {
      ...scheduleMeeting,
      bookedAt,
    };

    const secret = await createActionSecret();
    await createContact(data, secret);

    setIsSubmitting(false);
    setIsBookedSuccess(true);

    setScheduleMeeting(null);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await getBookings();

      if (res.error || !res.data) {
        console.error(res.error);
        return;
      }

      console.log(res.data);
      setStructuredBookings(res.data.map((booking) => booking.bookedAt));
    };

    fetchBookings();
  }, []);

  return (
    <div className="flex min-h-[32rem] flex-col justify-center space-y-10">
      <DialogHeader className="gap-10">
        <DialogTitle>Book a 1-1 Consultation Call</DialogTitle>
      </DialogHeader>

      <AppointmentCalendar
        bookedDates={structuredBookings}
        date={date}
        onDateChange={setDate}
        onTimeChange={setSelectedTime}
        time={selectedTime}
      />

      <DialogFooter>
        <Button
          onClick={goToPreviousStep}
          type="button"
          size={'sm'}
          variant={'ghost'}
        >
          Go Back
        </Button>

        <Button disabled={isSubmitting} onClick={handleSubmit} size={'sm'}>
          Confirm meeting
        </Button>
      </DialogFooter>
    </div>
  );
};

export default ScheduleForm;
