'use client';

import { useEffect, useState } from 'react';
import { DialogContent } from '../ui/dialog';
import BasicInfoForm from './BasicInfoForm';
import NicheForm from './NicheForm';
import FrequencyForm from './FrequencyForm';
import ChallengeForm from './ChallengeForm';
import DesiredIncomeForm from './DesiredIncomeForm';
import CurrentIncomeForm from './CurrentIncomeForm';
import InterestForm from './InterestForm';
import AmountInvestForm from './AmountInvestForm';
import ScheduleForm from './ScheduleForm';
import { cn } from '@/lib/utils';
import { useAtomValue, useSetAtom } from 'jotai';
import { scheduleMeetingAtom, stepAtom } from '@/lib/store';
import SavedProgress from './SavedProgress';
import MeetingBooked from './MeetingBooked';

const forms = [
  BasicInfoForm,
  NicheForm,
  FrequencyForm,
  ChallengeForm,
  DesiredIncomeForm,
  CurrentIncomeForm,
  InterestForm,
  AmountInvestForm,
  ScheduleForm,
];

export default function ScheduleDialog() {
  const setLastStep = useSetAtom(stepAtom);
  const [step, setStep] = useState(0);

  const [isBookedSuccess, setIsBookedSuccess] = useState<boolean>(false);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  const scheduleMeeting = useAtomValue(scheduleMeetingAtom);

  const Form = forms[step];

  const goToNextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, forms.length - 1));
    setLastStep((prevStep) => Math.min(prevStep + 1, forms.length - 1));
  };

  const goToPreviousStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  useEffect(() => {
    if (scheduleMeeting) return;

    if (!scheduleMeeting) {
      setStep(0);
      setHasSavedProgress(false);
    }
  }, [scheduleMeeting]);

  useEffect(() => {
    if (scheduleMeeting) {
      setHasSavedProgress(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isBookedSuccess) return <MeetingBooked />;
  if (hasSavedProgress)
    return (
      <SavedProgress
        setHasSavedProgress={setHasSavedProgress}
        setStep={setStep}
      />
    );

  if (!Form) return null;

  return (
    <DialogContent
      className={cn(
        'mx-auto flex w-[90%] flex-row items-center rounded-lg px-6 py-8 md:max-w-4xl md:px-60 md:py-20',
        step === forms.length - 1 && 'justify-center md:px-20',
      )}
    >
      <Form
        goToNextStep={goToNextStep}
        goToPreviousStep={goToPreviousStep}
        setIsBookedSuccess={setIsBookedSuccess}
      />
      <Steps totalSteps={forms.length} currentStep={step} />
    </DialogContent>
  );
}

interface StepsProps {
  totalSteps: number;
  currentStep: number;
}

const Steps = ({ totalSteps, currentStep }: StepsProps) => {
  if (currentStep === totalSteps - 1) return null;

  return (
    <div className="absolute right-40 hidden space-y-2 md:block">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`w-4 rounded-full ${index === currentStep ? 'bg-primary h-0.5 scale-x-150' : 'bg-muted h-px'}`}
        />
      ))}
    </div>
  );
};
