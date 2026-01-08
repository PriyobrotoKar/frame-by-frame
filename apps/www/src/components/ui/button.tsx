import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex group  z-10  items-center rounded-full relative justify-center gap-2 whitespace-nowrap  transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-[linear-gradient(75deg,var(--tw-gradient-stops))] from-primary via-secondary to-primary bg-[length:200%_100%] text-primary-foreground   hover:bg-right',
        destructive:
          'bg-destructive text-destructive-foreground  hover:bg-destructive/90',
        outline:
          'border border-primary text-primary disabled:border-primary-foreground/40 disabled:text-primary-foreground/80  before:absolute before:w-full secondary-btn-animation',
        secondary:
          'bg-secondary text-secondary-foreground  hover:bg-secondary/80',
        ghost: ' hover:text-primary',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-12 md:h-14 px-12 py-4 text-sm md:text-lg',
        sm: 'h-12  px-10 text-md',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
