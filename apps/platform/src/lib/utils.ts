import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': ['text-body-md'],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice({
  amount,
  currency,
  locale = 'en-IN',
}: {
  amount: number;
  currency: string;
  locale?: string;
}) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  }).format(amount);
}

export const slugify = (text: string | undefined) => {
  if (!text) return '';

  const lowerCased = text.trim().toLowerCase();

  let result = '';
  let prevDash = false;

  for (const char of lowerCased) {
    if ((char >= 'a' && char <= 'z') || (char >= '0' && char <= '9')) {
      result += char;
      prevDash = false;
    } else if (char === ' ' || char === '_' || char === '-') {
      if (!prevDash) {
        result += '-';
        prevDash = true;
      }
    }
  }

  if (result.endsWith('-')) {
    result = result.slice(0, -1);
  }

  return result;
};
