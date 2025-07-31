'use client';

import { useState } from 'react';
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
  const [step, setStep] = useState(8);

  const Form = forms[step];

  const goToNextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, forms.length - 1));
  };

  const goToPreviousStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  if (!Form) return null;

  return (
    <DialogContent
      className={cn(
        'flex w-full flex-row items-center rounded-lg px-6 py-20 md:max-w-4xl md:px-60',
        step === forms.length - 1 && 'justify-center md:px-20',
      )}
    >
      <Form goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />
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
    <div className="absolute right-40 space-y-2">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`w-4 rounded-full ${index === currentStep ? 'bg-primary h-0.5 scale-x-150' : 'bg-muted h-px'}`}
        />
      ))}
    </div>
  );
};
