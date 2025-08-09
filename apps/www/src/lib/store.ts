import { atomWithStorage } from 'jotai/utils';

export enum ContentFrequency {
  Consistent = 'Yes, consistently',
  Occasional = 'Yes, but not regularly',
  GettingStarted = 'No, just getting started',
  Never = 'Never created content before',
}

export enum DesiredIncome {
  Low = '~$1000',
  Medium = '~$5000',
  High = '~$10000',
  VeryHigh = '$20000+',
}
export enum CurrentIncome {
  VeryLow = '$0-$500',
  Low = '$500-$2000',
  Medium = '$2000-$4000',
  High = '$4000-$8000',
  VeryHigh = '$10000+',
}

export enum AmountToInvest {
  Zero = '$0',
  Low = '$1000-$2500',
  Medium = '$2500-$5000',
  High = '$5000-$7500',
  VeryHigh = '$10000+',
}

export interface ScheduleMeeting {
  name?: string;
  instagram?: string;
  email?: string;
  niche?: string;
  contentFrequency?: ContentFrequency;
  challenge?: string;
  desiredIncome?: DesiredIncome;
  currentIncome?: CurrentIncome;
  interest?: string;
  amountToInvest?: AmountToInvest;
  bookedAt?: Date;
}

export const scheduleMeetingAtom = atomWithStorage<ScheduleMeeting | null>(
  'schedule-details',
  null,
  undefined,
  {
    getOnInit: true,
  },
);

export const stepAtom = atomWithStorage<number>('last-step', 0, undefined, {
  getOnInit: true,
});
